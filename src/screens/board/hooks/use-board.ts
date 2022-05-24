import { Board } from 'types/board';
import { useQuery } from 'react-query';
import { useHttp } from 'utils/http';
import { cleanObject } from 'utils';

export const useBoards = (param: Partial<Board> = {}) => {
  const client = useHttp()

  return useQuery<Board[]>(['kanbans', param], () =>
    client('kanbans', { data: cleanObject(param) })
  )
}
