import React, { ReactNode } from "react"
import { User } from "types/user"
import { http } from "utils/http"
import { useMount } from "hooks/use-mount"
import { useAsync } from "hooks/use-async"
import { FullPageErrorFullback, FullPageLoading } from "components/lib"
import * as auth from "auth-provider"
import { useQueryClient } from "react-query"
export interface AuthForm {
  username: string
  password: string
  certifyPassword?: string
}

interface IAuthContext {
  user: User | null,
  register: (form: AuthForm) => Promise<void>
  login: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
}

export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }

  return user
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined)
AuthContext.displayName = 'AuthContext'


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, error, isLoading, isIdle, isError, run, setData: setUser } = useAsync<User | null>()

  const queryClient = useQueryClient()

  const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
  const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
  const logout = () => auth.logout().then(() => {
    setUser(null)
    //用useQuery缓存的数据清空
    queryClient.clear()
  })

  useMount(() => {
    //初始化user
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (error || isError) {
    return <FullPageErrorFullback error={error} />
  }

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}


export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
