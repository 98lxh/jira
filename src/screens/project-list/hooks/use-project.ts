import { useEffect } from 'react';
import { useAsync } from '../../../hooks/use-async';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

import { Project } from '../lits';

export const useProjects = (param: Partial<Project> = {}) => {
  const { run, ...result } = useAsync<Project[]>()
  const clinet = useHttp()
  useEffect(() => {
    run(clinet('projects', { data: cleanObject(param) }))
    // eslint-disable-next-line
  }, [param])

  return result
}
