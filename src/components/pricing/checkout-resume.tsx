'use client';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { LocaleLink } from '@/i18n/navigation';
import { getCheckoutReturnPath } from '@/lib/checkout-flow';
import { formatPrice } from '@/lib/formatter';
import { getPathWithLocale } from '@/lib/urls';
import { PaymentTypes, type Price, type PricePlan } from '@/payment/types';
import { Routes } from '@/routes';
import { useLocale, useTranslations } from 'next-intl';
import { CheckoutButton } from './create-checkout-button';

interface CheckoutResumeProps {
  plan: PricePlan;
  price: Price;
  canceled: boolean;
  metadata?: Record<string, string>;
  hasPaidPlan?: boolean;
}

export function CheckoutResume({
  plan,
  price,
  canceled,
  metadata,
  hasPaidPlan = false,
}: CheckoutResumeProps) {
  const t = useTranslations('PricingPage.CheckoutResume');
  const billingText = useTranslations('Dashboard.settings.billing');
  const user = useCurrentUser();
  const locale = useLocale();
  const amount = formatPrice(price.amount, price.currency);
  const billing =
    price.type === PaymentTypes.ONE_TIME
      ? t('oneTime', { amount })
      : price.interval === 'year'
        ? t('yearly', { amount })
        : t('monthly', { amount });
  const callbackUrl = getPathWithLocale(
    getCheckoutReturnPath(plan.id, price.interval),
    locale
  );

  if (hasPaidPlan) {
    return (
      <section className="flex flex-col gap-3 rounded-xl border border-primary p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium">{t('alreadyPaid')}</p>
        <Button asChild className="min-h-11">
          <LocaleLink href={Routes.SettingsBilling}>
            {billingText('manageBilling')}
          </LocaleLink>
        </Button>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="selected-plan-title"
      className="rounded-xl border-2 border-primary bg-background p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h2 id="selected-plan-title" className="text-lg font-semibold">
            {t('title', { plan: plan.name ?? plan.id })}
          </h2>
          <p className="font-medium">{billing}</p>
          <p className="max-w-xl text-sm text-muted-foreground">
            {canceled ? t('canceled') : t('review')}
          </p>
        </div>
        {user ? (
          <CheckoutButton
            userId={user.id}
            planId={plan.id}
            priceId={price.priceId}
            metadata={metadata}
            className="min-h-11 shrink-0"
          >
            {t('continue')}
          </CheckoutButton>
        ) : (
          <Button asChild className="min-h-11 shrink-0">
            <LocaleLink
              href={`${Routes.Login}?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            >
              {t('signIn')}
            </LocaleLink>
          </Button>
        )}
      </div>
    </section>
  );
}
