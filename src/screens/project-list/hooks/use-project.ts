import { QueryKey } from 'react-query';
import { useHttp } from 'utils/http';
import { Project } from '../list';
import { useQuery, useMutation } from 'react-query';
import { cleanObject } from 'utils';
import { useAddConfig, useDeleteConfig, useEditConfig } from 'hooks/use-optimistic-opitons';

export const useProjects = (param: Partial<Project> = {}) => {
  const client = useHttp()
  return useQuery<Project[]>(['projects', param], () => client('projects', { data: cleanObject(param) }))
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id
    }
  )
}

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) => client(`projects/${params.id}`, {
      method: 'PATCH',
      data: params
    }),
    useEditConfig(queryKey)
  )
}


export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  )
}



export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}
