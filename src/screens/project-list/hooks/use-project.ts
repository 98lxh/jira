import { useEffect } from 'react';
import { useAsync } from '../../../hooks/use-async';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

import { Project } from '../list';
export const useProjects = (param: Partial<Project> = {}) => {
  const { run, ...result } = useAsync<Project[]>()
  const clinet = useHttp()

  const fetchProjects = () => clinet('projects', { data: cleanObject(param) })
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    })
    // eslint-disable-next-line
  }, [param])

  return result
}
