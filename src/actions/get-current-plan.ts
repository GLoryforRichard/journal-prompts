'use server';

import { getDb } from '@/db';
import { payment } from '@/db/schema';
import type { SessionUser } from '@/lib/auth-types';
import { paymentGrantsPremium } from '@/lib/payment-entitlement';
import { findPlanByPriceId, getAllPricePlans } from '@/lib/price-plan';
import { userActionClient } from '@/lib/safe-action';
import {
  type PaymentStatus,
  PaymentTypes,
  type PlanInterval,
  type Subscription,
} from '@/payment/types';
import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';

const schema = z.object({
  userId: z.string().min(1, { error: 'User ID is required' }),
});

export const getCurrentPlanAction = userActionClient
  .inputSchema(schema)
  .action(async ({ ctx }) => {
    const currentUser = (ctx as { user: SessionUser }).user;
    try {
      const db = await getDb();
      const plans = getAllPricePlans();
      const records = await db
        .select()
        .from(payment)
        .where(eq(payment.userId, currentUser.id))
        .orderBy(desc(payment.createdAt));
      const entitled = records.filter((record) => paymentGrantsPremium(record));
      const lifetime = entitled.find(
        (record) => record.type === PaymentTypes.ONE_TIME
      );
      const recurring = entitled.find(
        (record) => record.type === PaymentTypes.SUBSCRIPTION
      );
      const canManageBilling = records.length > 0 || !!currentUser.customerId;
      let subscription: Subscription | null = null;
      if (recurring) {
        subscription = {
          id: recurring.subscriptionId || recurring.id,
          priceId: recurring.priceId,
          customerId: recurring.customerId,
          status: recurring.status as PaymentStatus,
          type: PaymentTypes.SUBSCRIPTION,
          interval: recurring.interval as PlanInterval,
          currentPeriodStart: recurring.periodStart || undefined,
          currentPeriodEnd: recurring.periodEnd || undefined,
          cancelAtPeriodEnd: recurring.cancelAtPeriodEnd || false,
          trialStartDate: recurring.trialStart || undefined,
          trialEndDate: recurring.trialEnd || undefined,
          createdAt: recurring.createdAt,
        };
      }
      // Keep historical purchases usable after their Stripe price is retired.
      const currentPlan = lifetime
        ? findPlanByPriceId(lifetime.priceId) ||
          plans.find((plan) => plan.isLifetime) ||
          null
        : recurring
          ? findPlanByPriceId(recurring.priceId) ||
            plans.find((plan) => !plan.isFree && !plan.isLifetime) ||
            null
          : plans.find((plan) => plan.isFree && !plan.disabled) || null;
      return {
        success: true,
        data: {
          currentPlan,
          subscription: lifetime ? null : subscription,
          canManageBilling,
        },
      };
    } catch (error) {
      console.error('Check current plan error:', error);
      return { success: false, error: 'Failed to get current plan' };
    }
  });
