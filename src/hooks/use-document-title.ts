import { useEffect, useRef } from "react"

/**
 * Note:React hook 与 闭包 (闭包陷阱)
 * 页面加载时:oldTitle === 旧Title
 * 加载后:oldTitle === 新title
*/

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        //如果不指定依赖 读到的就是旧title
        document.title = oldTitle
      }
    }
  }, [keepOnUnmount, oldTitle])
} 
