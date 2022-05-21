import React, { ReactNode, useState } from "react"
import { User } from "screens/project-list/search-panel"
import { http } from "utils/http"
import { useMount } from "hooks/use-mount"
import * as auth from "auth-provider"

interface AuthForm {
  username: string
  password: string
}

interface IAuthContext {
  user: User | null,
  register: (form: AuthForm) => Promise<void>
  login: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
}

const bootstrapUser = async () => {
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
  const [user, setUser] = useState<User | null>(null)

  const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
  const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    //初始化user
    bootstrapUser().then(setUser)
  })

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}


export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
