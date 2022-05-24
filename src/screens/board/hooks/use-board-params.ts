import { useUrlQueryParam } from 'hooks/use-query-param';
import { useMemo } from 'react';
import { useProject } from './../../project-list/hooks/use-project';
import { useProjectIdInUrl } from './../../../hooks/use-project-in-url';
import { useDebounce } from 'hooks/use-debounce';

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useBoardSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useBoardQueryKey = () => ['kanbans', useBoardSearchParams()];

export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId'])
  const projectId = useProjectIdInUrl()
  const debounceName = useDebounce(param.name, 200)

  return useMemo(() => ({
    projectId,
    typeId: Number(param.typeId) || undefined,
    processorId: Number(param.processorId) || undefined,
    tagId: Number(param.tagId) || undefined,
    name: debounceName
  }), [projectId, param, debounceName])
}

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()];
