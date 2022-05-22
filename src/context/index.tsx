import { ReactNode } from "react"
import { AuthProvider } from "./auth-context"
import { QueryClientProvider, QueryClient } from "react-query"
import { Provider } from "react-redux"
import { store } from "stores"
interface IAppProvides {
  children: ReactNode
}
export const AppProviders = ({ children }: IAppProvides) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  )
}
