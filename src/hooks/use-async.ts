//Note: useState传入函数是要惰性初始化,所以用useState保存函数不能直接传入函数
//const [retry, setRetry] = useState(() => { })
//Note: 用useRef保存函数
//注意:useRef保存的值并不是组件状态他只是一个普通的值它并不会触发组件重新渲染
//在整个生命周期内是不会改变的，当重新设置callback会，需要用callback.current读取最新的值
// const callbackRef = useRef(() => { })


//Note:useState适合保存单个的状态 useReducer适合保存多个状态会互相影响的状态

import { useCallback, useState, useReducer } from 'react';
import { useMountedRef } from './use-mount';

interface State<D> {
  error: Error | null
  data: D | null
  status: 'idle' | 'loading' | 'success' | 'error'
}

const defaultInitalState: State<null> = {
  status: 'idle',
  data: null,
  error: null
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()

  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])
}


export const useAsync = <D>(initialStata?: State<D>) => {
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) =>
    ({ ...state, ...action }), {
    ...defaultInitalState,
    ...initialStata
  })

  const safeDispatch = useSafeDispatch(dispatch)


  const [retry, setRetry] = useState(() => () => { })

  const setData = useCallback((data: D) => safeDispatch({
    data,
    status: 'success',
    error: null
  }), [safeDispatch])

  const setError = useCallback((error: Error) => safeDispatch({
    data: null,
    error: error,
    status: 'error'
  }), [safeDispatch])

  //触发异步请求
  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !(promise instanceof Promise)) {
      throw new Error('请传入promise类型数据')
    }

    setRetry(() => () => {
      runConfig?.retry && run(runConfig.retry(), runConfig)
    })

    //加载状态
    safeDispatch({ status: 'loading' })

    return promise
      .then(data => {
        setData(data)
        return data
      })
      .catch(error => {
        setError(error)
        return error
      })
  }, [safeDispatch, setData, setError])

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    setData,
    setError,
    run,
    retry,
    ...state
  }
}
