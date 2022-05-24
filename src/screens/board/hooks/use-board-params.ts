import { useUrlQueryParam } from 'hooks/use-query-param';
import { useMemo } from 'react';
import { useProject } from './../../project-list/hooks/use-project';
import { useProjectIdInUrl } from './../../../hooks/use-project-in-url';

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useBoardSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useBoardQueryKey = () => ['kanbans', useBoardSearchParams()];

export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId'])
  const projectId = useProjectIdInUrl()

  return useMemo(() => ({
    projectId,
    typeId: Number(param.typeId) || undefined,
    processorId: Number(param.processorId) || undefined,
    tagId: Number(param.tagId) || undefined,
    name: param.name
  }), [projectId, param])
}

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()];
