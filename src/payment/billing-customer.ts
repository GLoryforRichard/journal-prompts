interface BillingPayment {
  customerId: string;
  type: string;
  status: string;
  paid: boolean;
  createdAt: Date;
}

/** Prefer the ongoing subscription over a newer canceled or abandoned purchase. */
export function billingCustomerId(
  payments: BillingPayment[],
  fallback?: string | null
): string | undefined {
  const rank = (record: BillingPayment) =>
    record.type === 'subscription' &&
    [
      'active',
      'trialing',
      'past_due',
      'unpaid',
      'incomplete',
      'paused',
    ].includes(record.status)
      ? 2
      : record.paid
        ? 1
        : 0;
  return (
    [...payments].sort(
      (a, b) =>
        rank(b) - rank(a) || b.createdAt.getTime() - a.createdAt.getTime()
    )[0]?.customerId ||
    fallback ||
    undefined
  );
}
