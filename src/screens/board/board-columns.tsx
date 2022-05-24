import React from "react"
import { Card, Dropdown, Button, Menu, Modal } from "antd"
import { Board } from "types/board"
import { Task } from "types/task"
import { CreateTask } from "./create-task"
import { useBoardQueryKey, useTasksSearchParams } from "./hooks/use-board-params"
import { useTasks } from "./hooks/use-task"
import { useTasksModal } from "./hooks/use-task-modal"
import { useTaskTypes } from "./hooks/use-task-types"
import styled from "@emotion/styled"
import { Mark } from "components/mark"
import { useDeleteBoard } from "./hooks/use-board"
import { Row } from "components/lib"

const TaskTypeIcon: React.FC<{ id: number }> = ({ id }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if (!name) return null

  return <p>
    {name === 'bug' ? '🐛' : '💡'}
  </p>
}


const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const { startEdit } = useTasksModal()
  const { name: keyword } = useTasksSearchParams()
  return (
    <Card
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      onClick={() => startEdit(task.id)}
      key={task.id}
    >
      <Mark keyword={keyword} name={task.name}></Mark>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  )
}


const More: React.FC<{ board: Board }> = ({ board }) => {
  const { mutateAsync } = useDeleteBoard(useBoardQueryKey())
  const startEdit = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗',
      onOk: async () => mutateAsync(board)
    })
  }

  const overlay = (<Menu>
    <Menu.Item>
      <Button
        type="link"
        onClick={startEdit}>
        删除
      </Button>
    </Menu.Item>
  </Menu>)

  return <Dropdown
    overlay={overlay}
  >
    <Button type="link">...</Button>
  </Dropdown>
}

export const BoardColumns: React.FC<{ board: Board }> = ({ board }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter(task => task.kanbanId === board.id)

  return (
    <Container>
      <Row between={true}>
        <h3>{board.name}</h3>
        <More board={board} />
      </Row>
      <TaskContainer>
        {
          tasks?.map(task => <TaskCard task={task} />)
        }
        <CreateTask boardId={board.id} />
      </TaskContainer>
    </Container>
  )
}


export const Container = styled.div`
  min-width:27rem;
  border-radius:6px;
  background-color: rgb(244,245,247);
  display:flex;
  flex-direction: column;
  padding:0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TaskContainer = styled.div`
  overflow-y: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`
