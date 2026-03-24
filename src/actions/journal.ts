'use server';

import { getDb } from '@/db';
import { journalEntry, payment } from '@/db/app.schema';
import { userActionClient } from '@/lib/safe-action';
import type { SessionUser } from '@/lib/auth-types';
import { and, desc, eq } from 'drizzle-orm';
import { z } from 'zod';

const FREE_JOURNAL_LIMIT = 10;

async function isUserPaid(userId: string): Promise<boolean> {
  const db = await getDb();
  const result = await db
    .select({ id: payment.id })
    .from(payment)
    .where(and(eq(payment.userId, userId), eq(payment.paid, true)))
    .limit(1);
  return result.length > 0;
}

async function getUserEntryCount(userId: string): Promise<number> {
  const db = await getDb();
  const result = await db
    .select({ id: journalEntry.id })
    .from(journalEntry)
    .where(eq(journalEntry.userId, userId));
  return result.length;
}

// ─── Save (upsert) ───
const saveSchema = z.object({
  promptId: z.string().min(1),
  text: z.string(),
  promptText: z.string(),
});

export const saveJournalAction = userActionClient
  .inputSchema(saveSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { promptId, text, promptText } = parsedInput;
    const user = (ctx as { user: SessionUser }).user;
    const db = await getDb();

    // Check if entry already exists for this user+prompt
    const existing = await db
      .select({ id: journalEntry.id })
      .from(journalEntry)
      .where(
        and(
          eq(journalEntry.userId, user.id),
          eq(journalEntry.promptId, promptId),
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      // Update existing
      if (text.trim() === '') {
        // If text is empty, delete the entry
        await db
          .delete(journalEntry)
          .where(eq(journalEntry.id, existing[0].id));
        return { success: true };
      }
      await db
        .update(journalEntry)
        .set({ text, promptText, updatedAt: new Date() })
        .where(eq(journalEntry.id, existing[0].id));
      return { success: true };
    }

    // New entry — check limit for free users
    if (text.trim() === '') return { success: true };

    const isPaid = await isUserPaid(user.id);
    if (!isPaid) {
      const count = await getUserEntryCount(user.id);
      if (count >= FREE_JOURNAL_LIMIT) {
        return {
          success: false,
          error: 'limit_reached',
          data: { limit: FREE_JOURNAL_LIMIT },
        };
      }
    }

    await db.insert(journalEntry).values({
      id: crypto.randomUUID(),
      userId: user.id,
      promptId,
      promptText,
      text,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { success: true };
  });

// ─── Load single entry ───
const loadSchema = z.object({
  promptId: z.string().min(1),
});

export const loadJournalAction = userActionClient
  .inputSchema(loadSchema)
  .action(async ({ parsedInput, ctx }) => {
    const user = (ctx as { user: SessionUser }).user;
    const db = await getDb();
    const result = await db
      .select()
      .from(journalEntry)
      .where(
        and(
          eq(journalEntry.userId, user.id),
          eq(journalEntry.promptId, parsedInput.promptId),
        ),
      )
      .limit(1);

    if (result.length === 0) return { success: true, data: null };
    const e = result[0];
    return {
      success: true,
      data: {
        promptId: e.promptId,
        text: e.text,
        promptText: e.promptText,
        savedAt: e.updatedAt.toISOString(),
      },
    };
  });

// ─── List all entries ───
export const listJournalsAction = userActionClient.action(async ({ ctx }) => {
  const user = (ctx as { user: SessionUser }).user;
  const db = await getDb();

  const isPaid = await isUserPaid(user.id);

  const results = await db
    .select()
    .from(journalEntry)
    .where(eq(journalEntry.userId, user.id))
    .orderBy(desc(journalEntry.updatedAt));

  return {
    success: true,
    data: {
      entries: results.map((e) => ({
        promptId: e.promptId,
        text: e.text,
        promptText: e.promptText,
        savedAt: e.updatedAt.toISOString(),
      })),
      limit: isPaid ? null : FREE_JOURNAL_LIMIT,
      count: results.length,
    },
  };
});

// ─── Delete entry ───
const deleteSchema = z.object({
  promptId: z.string().min(1),
});

export const deleteJournalAction = userActionClient
  .inputSchema(deleteSchema)
  .action(async ({ parsedInput, ctx }) => {
    const user = (ctx as { user: SessionUser }).user;
    const db = await getDb();
    await db
      .delete(journalEntry)
      .where(
        and(
          eq(journalEntry.userId, user.id),
          eq(journalEntry.promptId, parsedInput.promptId),
        ),
      );
    return { success: true };
  });
