import styled from "@emotion/styled"
import { Card } from "antd"
import React from "react"
import { Board } from "types/board"
import { useTasksSearchParams } from "./hooks/use-board-params"
import { useTasks } from "./hooks/use-task"
import { useTaskTypes } from "./hooks/use-task-types"


const TaskTypeIcon: React.FC<{ id: number }> = ({ id }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if (!name) return null

  return <p>
    {name === 'bug' ? '🐛' : '💡'}
  </p>
}

export const BoardColumns: React.FC<{ board: Board }> = ({ board }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter(task => task.kanbanId === board.id)

  return (
    <Container>
      <h3>{board.name}</h3>
      <TaskContainer>
        {
          tasks?.map(task => (
            <Card style={{ marginBottom: '0.5rem' }} key={task.id}>
              {task.name}
              <TaskTypeIcon id={task.typeId} />
            </Card>
          ))
        }
      </TaskContainer>
    </Container>
  )
}


const Container = styled.div`
  min-width:27rem;
  border-radius:6px;
  background-color: rgb(244,245,247);
  display:flex;
  flex-direction: column;
  padding:0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`
