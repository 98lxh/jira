import { Board } from 'types/board';
import { useQuery, QueryKey, useMutation } from 'react-query';
import { useHttp } from 'utils/http';
import { cleanObject } from 'utils';
import { useAddConfig, useDeleteConfig } from 'hooks/use-optimistic-opitons';

export const useBoards = (param: Partial<Board> = {}) => {
  const client = useHttp()

  return useQuery<Board[]>(['kanbans', param], () =>
    client('kanbans', { data: cleanObject(param) })
  )
}


export const useAddBoard = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Board>) =>
      client(`kanbans`, {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}


export const useDeleteBoard = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  )
}
