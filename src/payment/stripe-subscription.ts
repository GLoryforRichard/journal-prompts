/** Accept both the legacy invoice shape and Stripe's parent-based invoice shape. */
export function extractStripeSubscriptionId(invoice: unknown): string | null {
  if (!invoice || typeof invoice !== 'object') return null;
  const idOf = (value: unknown): string | null => {
    const id =
      typeof value === 'string'
        ? value
        : value && typeof value === 'object' && 'id' in value
          ? value.id
          : null;
    return typeof id === 'string' && id.startsWith('sub_') ? id : null;
  };
  const source = invoice as {
    subscription?: unknown;
    parent?: { subscription_details?: { subscription?: unknown } };
    lines?: {
      data?: Array<{
        subscription?: unknown;
        parent?: { subscription_item_details?: { subscription?: unknown } };
      }>;
    };
  };
  const invoiceId =
    idOf(source.subscription) ||
    idOf(source.parent?.subscription_details?.subscription);
  if (invoiceId) return invoiceId;
  for (const line of source.lines?.data ?? []) {
    const id =
      idOf(line.subscription) ||
      idOf(line.parent?.subscription_item_details?.subscription);
    if (id) return id;
  }
  // A subscription item ID (si_...) cannot be used as a subscription ID.
  return null;
}
