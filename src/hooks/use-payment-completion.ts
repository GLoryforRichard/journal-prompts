import { checkPaymentCompletionAction } from '@/actions/check-payment-completion';
import { PAYMENT_POLL_INTERVAL } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

// Query keys for payment completion
export const paymentCompletionKeys = {
  all: ['paymentCompletion'] as const,
  session: (sessionId: string) =>
    [...paymentCompletionKeys.all, 'session', sessionId] as const,
};

// Hook to check if payment is completed by session ID
export function usePaymentCompletion(
  sessionId: string | null,
  enablePolling = false
) {
  return useQuery({
    queryKey: paymentCompletionKeys.session(sessionId || ''),
    queryFn: async () => {
      if (!sessionId) {
        return {
          isPaid: false,
          isFailed: false,
        };
      }
      const result = await checkPaymentCompletionAction({ sessionId });
      if (!result?.data?.success) {
        throw new Error(
          result?.data?.error || 'Failed to check payment completion'
        );
      }

      const { isPaid, isFailed } = result.data;
      return {
        isPaid,
        isFailed,
      };
    },
    enabled: !!sessionId,
    refetchInterval: (query) =>
      enablePolling && !query.state.data?.isPaid && !query.state.data?.isFailed
        ? PAYMENT_POLL_INTERVAL
        : false,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
