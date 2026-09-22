'use client';

import { Button } from '@/components/ui/button';
import { usePricePlans } from '@/config/price-config';
import { LocaleLink } from '@/i18n/navigation';
import { findCheckoutSelectionFromReturnPath } from '@/lib/checkout-flow';
import { formatPrice } from '@/lib/formatter';
import { PaymentTypes, type Price, type PricePlan } from '@/payment/types';
import { Routes } from '@/routes';
import { useLocale, useTranslations } from 'next-intl';

export function useCheckoutAuthSelection(callbackUrl: string) {
  const plans = usePricePlans();
  const locale = useLocale();
  return findCheckoutSelectionFromReturnPath(
    Object.values(plans),
    callbackUrl,
    locale
  );
}

interface CheckoutAuthContextProps {
  selection: { plan: PricePlan; price: Price };
  callbackUrl: string;
  mode: 'register' | 'login';
}

export function CheckoutAuthContext({
  selection: { plan, price },
  callbackUrl,
  mode,
}: CheckoutAuthContextProps) {
  const t = useTranslations('AuthPage.checkout');
  const billingText = useTranslations('PricingPage.CheckoutResume');
  const amount = formatPrice(price.amount, price.currency);
  const billing =
    price.type === PaymentTypes.ONE_TIME
      ? billingText('oneTime', { amount })
      : price.interval === 'year'
        ? billingText('yearly', { amount })
        : billingText('monthly', { amount });
  const alternateRoute = mode === 'register' ? Routes.Login : Routes.Register;

  return (
    <div className="mb-6 space-y-3 rounded-lg border bg-muted/40 p-4">
      <p className="font-medium">
        {billingText('title', { plan: plan.name ?? plan.id })}
      </p>
      <p className="text-sm">{billing}</p>
      <p className="text-sm text-muted-foreground">{t('reviewAfterAuth')}</p>
      <Button
        asChild
        variant="outline"
        className="min-h-11 h-auto w-full whitespace-normal"
      >
        <LocaleLink
          href={`${alternateRoute}?callbackUrl=${encodeURIComponent(callbackUrl)}`}
        >
          {mode === 'register' ? t('signInInstead') : t('createAccountInstead')}
        </LocaleLink>
      </Button>
    </div>
  );
}
