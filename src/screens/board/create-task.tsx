import { Card, Input } from "antd";
import { useProjectIdInUrl } from "hooks/use-project-in-url";
import React, { useEffect, useState } from "react";
import { useTasksQueryKey } from "./hooks/use-board-params";
import { useAddTasks, useTasks } from "./hooks/use-task";


export const CreateTask: React.FC<{ boardId: number }> = ({ boardId }) => {
  const [name, setName] = useState('')
  const { mutateAsync: addTasks } = useAddTasks(useTasksQueryKey())
  const projectId = useProjectIdInUrl()
  const [inputMode, setInputMode] = useState(false)

  const submit = async () => {
    await addTasks({ name, projectId, kanbanId: boardId })
    setInputMode(false)
    setName('')
  }

  const toggle = () => setInputMode(!inputMode)

  useEffect(() => {
    if (!inputMode) {
      setName('')
    }
  }, [inputMode])

  if (!inputMode) return <div onClick={toggle}>+创建事务</div>

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder="需要做些什么"
        autoFocus={true}
        value={name}
        onPressEnter={submit}
        onChange={evt => setName(evt.target.value)}
      />
    </Card>
  )
} 
