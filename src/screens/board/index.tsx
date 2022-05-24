import React from "react";
import { useDocumentTitle } from "hooks/use-document-title";
import { useBoards } from "./hooks/use-board";
import { useProjectInUrl } from "hooks/use-project-in-url";
import { BoardColumns } from "./board-columns";
import { useBoardSearchParams, useTasksSearchParams } from "./hooks/use-board-params";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib"
import { Spin } from "antd";
import { CreateBoard } from "./create-board";
import { TaskModal } from "./task-modal";
import { useTasks } from "./hooks/use-task";
import styled from "@emotion/styled";

export const BoardScreen: React.FC = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: boards, isLoading: boardIsLoading } = useBoards(useBoardSearchParams())
  const { isLoading: taskLoading } = useTasks(useTasksSearchParams())

  const isLoading = boardIsLoading || taskLoading

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {
        isLoading
          ? <Spin size="large" />
          : <ColumnsContainer>
            {
              boards?.map(board => (
                <BoardColumns
                  board={board}
                  key={board.id}
                />
              ))
            }
            <CreateBoard />
          </ColumnsContainer>
      }
      <TaskModal />
    </ScreenContainer>
  )
}


export const ColumnsContainer = styled.div`
  display: flex;
  overflow: scroll;
`
