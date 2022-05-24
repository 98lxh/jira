import { cleanObject } from 'utils';
import { useAsync } from './../../../hooks/use-async';
import { useHttp } from 'utils/http';
import { User } from 'types/user';
import { useMount } from 'hooks/use-mount';

export const useUsers = (param: Partial<User> = {}) => {
  const clinet = useHttp();
  const { run, ...result } = useAsync<User[]>()

  useMount(() => {
    run(clinet('users', { data: cleanObject(param) }))
  })

  return result
}
