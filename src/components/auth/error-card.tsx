'use client';

import { AuthCard } from '@/components/auth/auth-card';
import { getSafeReturnPath } from '@/lib/checkout-flow';
import { Routes } from '@/routes';
import { TriangleAlertIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export const ErrorCard = () => {
  const t = useTranslations('AuthPage.error');
  const callbackUrl = getSafeReturnPath(useSearchParams().get('callbackUrl'));

  return (
    <AuthCard
      headerLabel={t('title')}
      bottomButtonHref={`${Routes.Login}?callbackUrl=${encodeURIComponent(callbackUrl)}`}
      bottomButtonLabel={t('backToLogin')}
      className="border-none"
    >
      <div className="w-full flex justify-center items-center py-4 gap-2">
        <TriangleAlertIcon className="text-destructive size-4" />
        <p className="font-medium text-destructive">{t('tryAgain')}</p>
      </div>
    </AuthCard>
  );
};
