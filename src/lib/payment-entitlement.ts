import { PaymentScenes, PaymentTypes } from '@/payment/types';

export interface EntitlementPayment {
  paid: boolean;
  type: string;
  scene: string | null;
  status: string;
  periodEnd: Date | null;
  trialEnd?: Date | null;
}

/** A completed purchase remains valid even if its price is no longer offered. */
export function paymentGrantsPremium(
  record: EntitlementPayment,
  now = new Date()
): boolean {
  if (!record.paid) return false;

  if (record.type === PaymentTypes.ONE_TIME) {
    return (
      record.scene === PaymentScenes.LIFETIME && record.status === 'completed'
    );
  }

  if (
    record.type !== PaymentTypes.SUBSCRIPTION ||
    !['active', 'trialing'].includes(record.status)
  ) {
    return false;
  }

  const expiresAt =
    record.status === 'trialing'
      ? (record.trialEnd ?? record.periodEnd)
      : record.periodEnd;
  // Older records can lack period dates; retain the authoritative active status.
  return !expiresAt || expiresAt.getTime() > now.getTime();
}
