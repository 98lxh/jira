import React, { useCallback } from "react";
import { useDocumentTitle } from "hooks/use-document-title";
import { useBoards, useReorderBoard } from "./hooks/use-board";
import { useProjectInUrl } from "hooks/use-project-in-url";
import { BoardColumns } from "./board-columns";
import { useBoardQueryKey, useBoardSearchParams, useTasksQueryKey, useTasksSearchParams } from "./hooks/use-board-params";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib"
import { Spin } from "antd";
import { CreateBoard } from "./create-board";
import { TaskModal } from "./task-modal";
import { useReorderTask, useTasks } from "./hooks/use-task";
import styled from "@emotion/styled";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

export const BoardScreen: React.FC = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: boards, isLoading: boardIsLoading } = useBoards(useBoardSearchParams())
  const { isLoading: taskLoading } = useTasks(useTasksSearchParams())

  const isLoading = boardIsLoading || taskLoading

  const onDragEnd = useDragEnd()

  return (
    <DragDropContext onDragEnd={(...params) => { onDragEnd(params[0]) }}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {
          isLoading
            ? <Spin size="large" />
            : (<ColumnsContainer>
              <Drop type="columns" direction="horizontal" droppableId="board">
                <DropChild style={{ display: 'flex' }}>
                  {
                    boards?.map((board, index) => (
                      <Drag key={board.id} draggableId={board.id + ''} index={index}>
                        <BoardColumns
                          board={board}
                          key={board.id}
                        />
                      </Drag>
                    ))
                  }
                </DropChild>
              </Drop>
              <CreateBoard />
            </ColumnsContainer>
            )
        }
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  )
}


export const useDragEnd = () => {
  const { data: boards } = useBoards(useBoardSearchParams())
  const { data: allTasks = [] } = useTasks(useTasksSearchParams())
  const { mutate: reorderBoard } = useReorderBoard(useBoardQueryKey())
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey())

  return useCallback(({ source, destination, type }: DropResult) => {
    if (!destination) return

    if (type === 'columns') {
      const fromId = boards?.[source.index].id
      const toId = boards?.[destination.index].id
      if (!fromId || !toId || fromId === toId) return

      const type = destination.index > source.index ? 'after' : 'before'
      reorderBoard({
        fromId,
        referenceId: toId,
        type
      })
    }

    if (type === 'row') {
      const fromBoardId = +source.droppableId
      const toBoardId = +destination.droppableId
      const fromTask = allTasks.filter(task => task.kanbanId === fromBoardId)[source.index]
      const toTasks = allTasks.filter(task => task.kanbanId === toBoardId)[destination.index]

      if (fromTask.id === toTasks.id) {
        return
      }

      reorderTask({
        fromId: fromTask?.id,
        referenceId: toTasks?.id,
        fromKanbanId: fromBoardId,
        toKanbanId: toBoardId,
        type: fromBoardId === toBoardId && destination.index > source.index ? 'after' : 'before'
      })
    }

  }, [reorderBoard, boards, allTasks, reorderTask])
}


export const ColumnsContainer = styled.div`
  display: flex;
  overflow: scroll;
`
