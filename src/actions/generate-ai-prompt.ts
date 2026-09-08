'use server';

import { creditTransaction } from '@/db/app.schema';
import { getDb } from '@/db/index';
import type { SessionUser } from '@/lib/auth-types';
import { generatePromptWithAI } from '@/lib/openrouter';
import { checkPremiumAccess } from '@/lib/premium-access';
import { userActionClient } from '@/lib/safe-action';
import { and, eq, gte, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const DAILY_LIMIT_FREE = 3;
const DAILY_LIMIT_PAID = 100;
const AI_GENERATION_TYPE = 'AI_GENERATION';

const generateSchema = z.object({
  mood: z
    .string()
    .refine(
      (value) =>
        [
          'anxious',
          'grateful',
          'stuck',
          'curious',
          'sad',
          'energized',
          'reflective',
          'restless',
        ].includes(value),
      'Choose a valid mood'
    ),
  direction: z
    .string()
    .refine(
      (value) =>
        [
          'self-discovery',
          'gratitude',
          'healing',
          'creativity',
          'goal-setting',
          'relationships',
        ].includes(value),
      'Choose a valid writing direction'
    ),
  scene: z.string().max(100).optional(),
});

/**
 * Count how many AI generations the user has done today
 */
async function getDailyUsageCount(userId: string): Promise<number> {
  const db = await getDb();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(creditTransaction)
    .where(
      and(
        eq(creditTransaction.userId, userId),
        eq(creditTransaction.type, AI_GENERATION_TYPE),
        gte(creditTransaction.createdAt, today)
      )
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
      const isPaid = await checkPremiumAccess(currentUser.id);
      const dailyLimit = isPaid ? DAILY_LIMIT_PAID : DAILY_LIMIT_FREE;
      const usageCount = await getDailyUsageCount(currentUser.id);

      if (usageCount >= dailyLimit) {
        return {
          success: false,
          error: isPaid
            ? "You've used all your surprises for today. Come back tomorrow!"
            : "You've used your 3 free surprises today. Upgrade for more!",
          remainingCount: 0,
          limitReached: true,
          isPaid,
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
      console.error(
        'AI generation failed:',
        error instanceof Error ? error.name : 'Unknown error'
      );
      return {
        success: false,
        error:
          'AI prompts are temporarily unavailable. Please try again shortly.',
      };
    }
  });
