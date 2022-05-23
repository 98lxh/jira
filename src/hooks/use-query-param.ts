import { cleanObject } from './../utils/index';
import { useMemo, useState } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"

/**
 * @description 返回页面url中，指定键的参数值
*/
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams()
  const setSearchParams = useSetUrlSearchParams()
  const [stateKeys] = useState(keys)

  const params = useMemo(() =>
  (stateKeys.reduce((prev, key) => {
    return { ...prev, [key]: searchParams.get(key) || '' }
  }, {} as { [key in K]: string })),
    [searchParams, stateKeys])

  const setParams = (params: Partial<{ [key in K]: unknown }>) => {
    return setSearchParams(params)
  }

  return [
    params,
    setParams
  ] as const
}

export const useSetUrlSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (params: { [key in string]: unknown }) => {
    const newParams = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
    return setSearchParams(newParams)
  }
}
