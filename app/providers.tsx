'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Recommended setting
      staleTime: 5 * 60 * 1000, // Use the same stale time as in your component
    },
  },
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Optional: Add Devtools for easier debugging */}
      <ReactQueryDevtools initialIsOpen={false} /> 
    </QueryClientProvider>
  )
}