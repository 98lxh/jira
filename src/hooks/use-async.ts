import { useState } from 'react';
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

export const useAsync = <D>(initialStata?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitalState,
    ...initialStata
  })

  //Note: useState传入函数是要惰性初始化,所以用useState保存函数不能直接传入函数
  //const [retry, setRetry] = useState(() => { })
  //Note: 用useRef保存函数
  //注意:useRef保存的值并不是组件状态他只是一个普通的值它并不会触发组件重新渲染
  //在整个生命周期内是不会改变的，当重新设置callback会，需要用callback.current读取最新的值
  // const callbackRef = useRef(() => { })

  const [retry, setRetry] = useState(() => () => { })

  const setData = (data: D) => setState({
    data,
    status: 'success',
    error: null
  })

  const setError = (error: Error) => setState({
    data: null,
    error: error,
    status: 'error'
  })

  //触发异步请求
  const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !(promise instanceof Promise)) {
      throw new Error('请传入promise类型数据')
    }

    setRetry(() => () => {
      runConfig?.retry && run(runConfig.retry(), runConfig)
    })

    //加载状态
    setState({ ...state, status: 'loading' })
    return promise
      .then(data => {
        setData(data)
        return data
      })
      .catch(error => {
        setError(error)
        return error
      })
  }

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
