import { ReactNode } from "react"
import { AuthProvider } from "./auth-context"

interface IAppProvides {
  children: ReactNode
}
export const AppProviders = ({ children }: IAppProvides) => {
  return <AuthProvider>
    {children}
  </AuthProvider>
}
