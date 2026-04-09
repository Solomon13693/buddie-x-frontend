import { QueryClient } from '@tanstack/react-query';

/**
 * Shared QueryClient instance so we can clear the cache on logout.
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 10,
            gcTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: (failureCount, error: unknown) => {
                const err = error as { response?: { status?: number } };
                if (err?.response?.status === 404) {
                    return false;
                }
                return failureCount < 1;
            },
            retryDelay: 2000,
        },
    },
});
