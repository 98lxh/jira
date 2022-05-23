import React, { ReactNode, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { User } from "screens/project-list/search-panel"
import { http } from "utils/http"
import { useMount } from "hooks/use-mount"
import { useAsync } from "hooks/use-async"
import { FullPageErrorFullback, FullPageLoading } from "components/lib"
import * as auth from "auth-provider"
import * as authStore from "stores/auth.slice"
export interface AuthForm {
  username: string
  password: string
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



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { error, isLoading, isIdle, isError, run } = useAsync<User | null>()

  const dispatch = useDispatch() as (...args: unknown[]) => Promise<User>

  useMount(() => {
    //初始化user
    run(dispatch(authStore.bootstrap()))
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (error || isError) {
    return <FullPageErrorFullback error={error} />
  }

  return <>
    {children}
  </>
}


export const useAuth = () => {
  const dispatch = useDispatch() as (...args: unknown[]) => Promise<User>
  const user = useSelector(authStore.selectUser)
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout() as any), [dispatch])

  return {
    user,
    login,
    register,
    logout,
  }
}
