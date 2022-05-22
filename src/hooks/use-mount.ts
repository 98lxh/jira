import { useEffect, useRef } from "react"

/**
 * @description 组件挂载时调用
*/
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback() // eslint-disable-next-line 
  }, [])
}


/**
 * @description 返回组件的挂载状态，如果还没挂载或者已经卸载返回false
*/
export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}
