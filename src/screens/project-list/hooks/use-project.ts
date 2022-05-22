import { useCallback, useEffect } from 'react';
import { useAsync } from '../../../hooks/use-async';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

import { Project } from '../list';
export const useProjects = (param: Partial<Project> = {}) => {
  const { run, ...result } = useAsync<Project[]>()
  const client = useHttp()

  const fetchProjects = useCallback(() => client('projects', { data: cleanObject(param) }), [client, param])
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    })
  }, [param, fetchProjects, run])

  return result
}
