import { QueryClient, QueryCache, isServer } from '@tanstack/react-query';
import { logError } from '@/common/utils/logError';

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        logError({
          error: error?.message || error,
          location: 'React Query',
          when: `fetching data for query key: ${query.queryKey}`,
        });
      },
    }),
    defaultOptions: {
      queries: {
        // staleTime > 0 so data prefetched on the server is not refetched
        // immediately on the client after hydration.
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/**
 * Server: a brand-new client per request (no cross-request data leakage).
 * Browser: a single shared client for the session.
 */
export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}
