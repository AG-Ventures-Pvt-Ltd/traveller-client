'use client';

import { QueryClient,QueryCache, QueryClientProvider } from '@tanstack/react-query';
import { logError } from '@/common/utils/logError';


export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      logError({
        error : error?.message || error,
        location: 'React Query',
        when: `fetching data for query key: ${query.queryKey}`,
      });
    }
  })
});


  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
