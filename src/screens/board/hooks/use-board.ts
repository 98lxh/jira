import { useReorderBoardConfig } from './../../../hooks/use-optimistic-opitons';
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

export interface SortProps {
  //放到目标前还是后面
  type: 'before' | 'after'
  //要重新排序的item
  fromId: number
  //目标item
  referenceId: number
  //针对task
  fromKanbanId?: number
  toKanbanId?: number
}


export const useReorderBoard = (queryKey: QueryKey) => {
  const clinet = useHttp()
  return useMutation(
    (params: SortProps) => {
      return clinet('kanbans/reorder', {
        data: params,
        method: 'POST'
      })
    },
    useReorderBoardConfig(queryKey)
  )
}
