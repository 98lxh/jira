import { Task } from 'types/task';
import { useQuery } from 'react-query';
import { useHttp } from 'utils/http';
import { cleanObject } from 'utils';

export const useTasks = (param: Partial<Task> = {}) => {
  const client = useHttp()

  return useQuery<Task[]>(['tasks', param], () =>
    client('tasks', { data: cleanObject(param) })
  )
}
