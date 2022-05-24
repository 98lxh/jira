import { useAddConfig, useDeleteConfig, useEditConfig } from 'hooks/use-optimistic-opitons';
import { Task } from 'types/task';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { useHttp } from 'utils/http';
import { cleanObject } from 'utils';

export const useTasks = (param: Partial<Task> = {}) => {
  const client = useHttp()

  return useQuery<Task[]>(['tasks', param], () =>
    client('tasks', { data: cleanObject(param) })
  )
}

export const useTask = (id?: number) => {
  const client = useHttp()
  return useQuery<Task>(
    ['task', { id }],
    () => client(`tasks/${id}`),
    {
      enabled: !!id
    }
  )
}

export const useAddTasks = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}


export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Task>) => client(`tasks/${params.id}`, {
      method: 'PATCH',
      data: params
    }),
    useEditConfig(queryKey)
  )
}


export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  )
}
