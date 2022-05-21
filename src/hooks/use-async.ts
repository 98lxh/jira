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
  const run = (promise: Promise<D>) => {
    if (!promise || !(promise instanceof Promise)) {
      throw new Error('请传入promise类型数据')
    }

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
    ...state
  }
}
