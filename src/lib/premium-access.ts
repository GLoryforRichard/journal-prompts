import { getDb } from '@/db';
import { payment } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { paymentGrantsPremium } from './payment-entitlement';

/** Shared entitlement check for journal, AI and premium content. */
export async function checkPremiumAccess(userId: string): Promise<boolean> {
  const db = await getDb();
  const records = await db
    .select({
      paid: payment.paid,
      type: payment.type,
      scene: payment.scene,
      status: payment.status,
      periodEnd: payment.periodEnd,
      trialEnd: payment.trialEnd,
    })
    .from(payment)
    .where(and(eq(payment.userId, userId), eq(payment.paid, true)));

  return records.some((record) => paymentGrantsPremium(record));
}
