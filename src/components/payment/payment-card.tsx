'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { usePaymentCompletion } from '@/hooks/use-payment-completion';
import { LocaleLink, useLocaleRouter } from '@/i18n/navigation';
import {
  getPaymentDestination,
  isCheckoutSessionId,
} from '@/lib/checkout-flow';
import { trackFunnelEvent } from '@/lib/analytics';
import { authClient } from '@/lib/auth-client';
import { PAYMENT_MAX_POLL_TIME } from '@/lib/constants';
import { Routes } from '@/routes';
import { useQueryClient } from '@tanstack/react-query';
import { AlertCircleIcon, CheckCircleIcon, RefreshCwIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function PaymentCard() {
  const t = useTranslations('Dashboard.settings.payment');
  const localeRouter = useLocaleRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const rawSessionId = searchParams.get('session_id');
  const sessionId = isCheckoutSessionId(rawSessionId) ? rawSessionId : null;
  const destination = getPaymentDestination(searchParams.get('callback'));
  const {
    data: session,
    isPending: isSessionPending,
    error: sessionError,
  } = authClient.useSession();
  const userId =
    !isSessionPending && !sessionError ? session?.user.id : undefined;
  const [timedOutFor, setTimedOutFor] = useState<{
    userId: string;
    sessionId: string;
  } | null>(null);
  const timedOut =
    !!timedOutFor &&
    timedOutFor.userId === userId &&
    timedOutFor.sessionId === sessionId;
  const [attempt, setAttempt] = useState(0);
  const { data, isError, isFetching, refetch } = usePaymentCompletion(
    sessionId,
    userId,
    !!sessionId && !timedOut
  );
  const status = !sessionId
    ? 'missing'
    : isSessionPending
      ? 'processing'
      : sessionError || !userId
        ? 'error'
        : data?.isPaid
          ? 'success'
          : data?.isFailed
            ? 'failed'
            : isError
              ? 'error'
              : timedOut
                ? 'timeout'
                : 'processing';

  useEffect(() => {
    setTimedOutFor(null);
    if (!sessionId || !userId) return;
    const timeout = setTimeout(
      () => setTimedOutFor({ sessionId, userId }),
      PAYMENT_MAX_POLL_TIME
    );
    return () => clearTimeout(timeout);
  }, [sessionId, userId, attempt]);

  useEffect(() => {
    if (status === 'processing') return;
    trackFunnelEvent(
      'checkout_return',
      {
        status:
          status === 'success'
            ? 'confirmed'
            : status === 'timeout'
              ? 'timeout'
              : 'error',
      },
      { dedupeKey: `${sessionId ?? 'missing'}:${status}` }
    );
  }, [sessionId, status]);

  useEffect(() => {
    if (status !== 'success') return;
    // Refresh benefits without making navigation depend on a slow fetch.
    void queryClient.invalidateQueries({ queryKey: ['payment'] });
    void queryClient.invalidateQueries({ queryKey: ['credits'] });
    const redirect = setTimeout(() => localeRouter.replace(destination), 1500);
    return () => clearTimeout(redirect);
  }, [status, queryClient, localeRouter, destination]);

  const retry = () => {
    setTimedOutFor(null);
    setAttempt((value) => value + 1);
    void refetch();
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center py-4" aria-live="polite">
          <div className="flex justify-center mb-6">
            {status === 'processing' ? (
              <RefreshCwIcon className="h-12 w-12 text-cyan-600 animate-spin" />
            ) : status === 'success' ? (
              <CheckCircleIcon className="h-12 w-12 text-green-600" />
            ) : (
              <AlertCircleIcon className="h-12 w-12 text-amber-600" />
            )}
          </div>
          <CardTitle>{t(`${status}.title`)}</CardTitle>
          <CardDescription>{t(`${status}.description`)}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {sessionId && ['timeout', 'error', 'failed'].includes(status) && (
            <Button onClick={retry} disabled={isFetching} className="min-h-11">
              <RefreshCwIcon className="mr-2 size-4" />
              {t('retry')}
            </Button>
          )}
          <Button
            asChild
            variant={status === 'success' ? 'default' : 'outline'}
            className="min-h-11"
          >
            <LocaleLink href={Routes.Dashboard}>{t('openJournal')}</LocaleLink>
          </Button>
          {status !== 'success' && (
            <Button asChild variant="link">
              <LocaleLink href={Routes.SettingsBilling}>
                {t('viewBilling')}
              </LocaleLink>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
