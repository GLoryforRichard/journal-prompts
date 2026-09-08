interface CustomerIdentity {
  deleted?: unknown;
  email?: string | null;
  metadata?: { userId?: string };
}

interface PortalIdentity {
  userId: string;
  customerEmail: string;
  emailVerified: boolean;
  hasPaymentHistory: boolean;
}

/** Billing history is server-owned; a client-editable customer ID is insufficient. */
export function ownsStripeCustomer(
  customer: CustomerIdentity,
  identity: PortalIdentity
): boolean {
  if (customer.deleted) return false;
  if (customer.metadata?.userId) {
    return customer.metadata.userId === identity.userId;
  }
  if (identity.hasPaymentHistory) return true;
  return (
    identity.emailVerified &&
    !!customer.email &&
    customer.email.toLowerCase() === identity.customerEmail.toLowerCase()
  );
}
