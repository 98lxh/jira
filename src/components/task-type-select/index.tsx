import React from "react"
import { IdSelect } from "components/id-select"
import { useTaskTypes } from "screens/board/hooks/use-task-types"

type UserSelectProps = React.ComponentProps<typeof IdSelect>

export const TaskTypeSelect: React.FC<UserSelectProps> = (props) => {
  const { data: taskTypes } = useTaskTypes()

  return <IdSelect options={taskTypes || []} {...props} />
}
