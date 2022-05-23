import { cleanObject } from './../utils/index';
import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"

/**
 * @description 返回页面url中，指定键的参数值
*/
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useMemo(() =>
  (keys.reduce((prev, key) => {
    return { ...prev, [key]: searchParams.get(key) || '' }
  }, {} as { [key in K]: string })), // eslint-disable-next-line 
    [searchParams])

  const setParams: (params: Partial<{ [key in K]: unknown }>) => void = (params) => {
    const newParams = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
    return setSearchParams(newParams)
  }

  return [
    params,
    setParams
  ] as const
}
