import { useMemo } from 'react';
import { useUrlQueryParam } from 'hooks/use-query-param';

//项目列表搜索参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam
  ] as const
}


export const useProjectQueryKey = () => {
  const [params] = useProjectsSearchParams()
  return ['projects', params]
}
