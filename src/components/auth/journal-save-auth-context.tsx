'use client';

import { getSafeReturnPath } from '@/lib/checkout-flow';
import { Routes } from '@/routes';
import { useLocale, useTranslations } from 'next-intl';

export function JournalSaveAuthContext({
  callbackUrl,
}: {
  callbackUrl: string;
}) {
  const locale = useLocale();
  const t = useTranslations('AuthPage.journalSave');
  const { pathname } = new URL(
    getSafeReturnPath(callbackUrl, '/'),
    'https://callback.invalid'
  );
  if (
    pathname !== Routes.Dashboard &&
    pathname !== `/${locale}${Routes.Dashboard}`
  ) {
    return null;
  }

  return (
    <div className="mb-6 space-y-3 rounded-lg border bg-muted/40 p-4">
      <p className="font-medium">{t('title')}</p>
      <p className="text-sm">{t('freeAccount')}</p>
      <p className="text-sm text-muted-foreground">{t('chooseEntries')}</p>
    </div>
  );
}
