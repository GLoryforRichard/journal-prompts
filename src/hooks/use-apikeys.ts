import { authClient } from '@/lib/auth-client';
import type { ApiKey } from '@/db/types';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// Query keys
export const apiKeysKeys = {
  all: ['apikeys'] as const,
  lists: () => [...apiKeysKeys.all, 'lists'] as const,
  list: (params: { pageIndex: number; pageSize: number }) =>
    [...apiKeysKeys.lists(), params] as const,
};

// Hook to fetch API keys with pagination
export function useApiKeys(pageIndex: number, pageSize: number) {
  return useQuery({
    queryKey: apiKeysKeys.list({ pageIndex, pageSize }),
    queryFn: async () => {
      const result = await authClient.apiKey.list({
        query: {
          limit: pageSize,
          offset: pageIndex * pageSize,
          sortBy: 'createdAt',
          sortDirection: 'desc',
        },
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to fetch API keys');
      }

      // API returns array directly
      const items = (result.data || []) as ApiKey[];
      return {
        items,
        total: items.length,
      };
    },
    placeholderData: keepPreviousData,
  });
}

// Hook to create API key
export function useCreateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const result = await authClient.apiKey.create({ name });
      if ('data' in result && result.data) {
        return result.data;
      }
      throw new Error('Failed to create API key');
    },
    onSuccess: () => {
      // Invalidate all API keys queries to refresh the data
      queryClient.invalidateQueries({
        queryKey: apiKeysKeys.all,
      });
    },
  });
}

// Hook to delete API key
export function useDeleteApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ keyId }: { keyId: string }) => {
      await authClient.apiKey.delete({ keyId });
    },
    onSuccess: () => {
      // Invalidate all API keys queries to refresh the data
      queryClient.invalidateQueries({
        queryKey: apiKeysKeys.all,
      });
    },
  });
}
