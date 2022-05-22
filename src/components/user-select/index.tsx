import { IdSelect } from "components/id-select"
import { useUsers } from "screens/project-list/hooks/use-user"

type UserSelectProps = React.ComponentProps<typeof IdSelect>

export const UserSelect: React.FC<UserSelectProps> = (props) => {
  const { data: users } = useUsers()

  return <IdSelect options={users || []} {...props} />
}
