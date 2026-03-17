'use server';

import { creditTransaction, payment } from '@/db/app.schema';
import { getDb } from '@/db/index';
import type { SessionUser } from '@/lib/auth-types';
import { generatePromptWithAI } from '@/lib/openrouter';
import { userActionClient } from '@/lib/safe-action';
import { and, eq, gte, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const DAILY_LIMIT_FREE = 3;
const DAILY_LIMIT_PAID = 100;
const AI_GENERATION_TYPE = 'AI_GENERATION';

const generateSchema = z.object({
  mood: z.string().min(1),
  direction: z.string().min(1),
  scene: z.string().optional(),
});

/**
 * Check if user has an active paid plan (subscription or lifetime)
 */
async function isUserPaid(userId: string): Promise<boolean> {
  const db = await getDb();
  const activePayment = await db
    .select({ id: payment.id })
    .from(payment)
    .where(
      and(
        eq(payment.userId, userId),
        eq(payment.paid, true),
      ),
    )
    .limit(1);

  return activePayment.length > 0;
}

/**
 * Count how many AI generations the user has done today
 */
async function getDailyUsageCount(userId: string): Promise<number> {
  const db = await getDb();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(creditTransaction)
    .where(
      and(
        eq(creditTransaction.userId, userId),
        eq(creditTransaction.type, AI_GENERATION_TYPE),
        gte(creditTransaction.createdAt, today),
      ),
    );

  return Number(result[0]?.count ?? 0);
}

/**
 * Generate an AI journal prompt with daily rate limiting
 * Free users: 3/day, Paid users: 100/day
 */
export const generateAIPromptAction = userActionClient
  .inputSchema(generateSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { mood, direction, scene } = parsedInput;
    const currentUser = (ctx as { user: SessionUser }).user;

    try {
      // Check daily limit
      const isPaid = await isUserPaid(currentUser.id);
      const dailyLimit = isPaid ? DAILY_LIMIT_PAID : DAILY_LIMIT_FREE;
      const usageCount = await getDailyUsageCount(currentUser.id);

      if (usageCount >= dailyLimit) {
        return {
          success: false,
          error: isPaid
            ? `Daily limit reached (${DAILY_LIMIT_PAID}/day). Try again tomorrow!`
            : `Free limit reached (${DAILY_LIMIT_FREE}/day). Upgrade to Pro for ${DAILY_LIMIT_PAID}/day!`,
          remainingCount: 0,
        };
      }

      // Generate prompt via OpenRouter
      const promptText = await generatePromptWithAI(mood, direction, scene);

      // Record usage
      const db = await getDb();
      await db.insert(creditTransaction).values({
        id: nanoid(),
        userId: currentUser.id,
        type: AI_GENERATION_TYPE,
        description: `AI prompt: ${mood} / ${direction}`,
        amount: -1,
      });

      return {
        success: true,
        prompt: promptText,
        remainingCount: dailyLimit - usageCount - 1,
      };
    } catch (error) {
      console.error('AI generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate prompt',
      };
    }
  });
