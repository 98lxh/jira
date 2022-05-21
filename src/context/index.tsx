import { ReactNode } from "react"
import { AuthProvider } from "./auth-context"
import { QueryClientProvider, QueryClient } from "react-query"
interface IAppProvides {
  children: ReactNode
}
export const AppProviders = ({ children }: IAppProvides) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  )
}
