import { checkPaymentCompletionAction } from '@/actions/check-payment-completion';
import { PAYMENT_POLL_INTERVAL } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

// Query keys for payment completion
export const paymentCompletionKeys = {
  all: ['paymentCompletion'] as const,
  session: (userId: string, sessionId: string) =>
    [
      ...paymentCompletionKeys.all,
      'user',
      userId,
      'session',
      sessionId,
    ] as const,
};

// Hook to check if payment is completed by session ID
export function usePaymentCompletion(
  sessionId: string | null,
  userId: string | undefined,
  enablePolling = false
) {
  return useQuery({
    queryKey: paymentCompletionKeys.session(userId || '', sessionId || ''),
    queryFn: async () => {
      if (!sessionId || !userId) {
        return {
          isPaid: false,
          isFailed: false,
        };
      }
      const result = await checkPaymentCompletionAction({
        sessionId,
        expectedUserId: userId,
      });
      if (!result?.data?.success) {
        throw new Error(
          result?.data?.error || 'Failed to check payment completion'
        );
      }
      if (result.data.checkedUserId !== userId) {
        throw new Error('Your account changed. Reload to check payment.');
      }

      const { isPaid, isFailed } = result.data;
      return {
        isPaid,
        isFailed,
      };
    },
    enabled: !!sessionId && !!userId,
    refetchInterval: (query) =>
      enablePolling && !query.state.data?.isPaid && !query.state.data?.isFailed
        ? PAYMENT_POLL_INTERVAL
        : false,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
