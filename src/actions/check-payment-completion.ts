'use server';

import { getDb } from '@/db';
import { payment } from '@/db/schema';
import { userActionClient } from '@/lib/safe-action';
import { isCheckoutSessionId } from '@/lib/checkout-flow';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

const checkPaymentCompletionSchema = z.object({
  sessionId: z.string().refine(isCheckoutSessionId, 'Invalid checkout session'),
  expectedUserId: z.string().min(1).optional(),
});

/**
 * Check if a payment is completed for the given session ID
 */
export const checkPaymentCompletionAction = userActionClient
  .inputSchema(checkPaymentCompletionSchema)
  .action(async ({ parsedInput: { sessionId, expectedUserId }, ctx }) => {
    if (expectedUserId && expectedUserId !== ctx.user.id) {
      return {
        success: false,
        error: 'Your account changed. Reload to check payment.',
      };
    }
    try {
      const db = await getDb();
      const paymentRecord = await db
        .select()
        .from(payment)
        .where(
          and(eq(payment.sessionId, sessionId), eq(payment.userId, ctx.user.id))
        )
        .limit(1);

      const paymentData = paymentRecord[0] || null;
      const isPaid = paymentData ? paymentData.paid : false;
      const isFailed =
        !!paymentData &&
        !isPaid &&
        ['failed', 'incomplete_expired', 'unpaid'].includes(paymentData.status);

      return {
        success: true,
        checkedUserId: ctx.user.id,
        isPaid,
        isFailed,
      };
    } catch (error) {
      console.error('Check payment completion error:', error);
      return {
        success: false,
        error: 'Failed to check payment completion',
      };
    }
  });
