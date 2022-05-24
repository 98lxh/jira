import React from "react";
import { useDocumentTitle } from "hooks/use-document-title";
import { useBoards } from "./hooks/use-board";
import { useProjectInUrl } from "hooks/use-project-in-url";
import { BoardColumns } from "./board-columns";
import { useBoardSearchParams } from "./hooks/use-board-params";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";

export const BoardScreen: React.FC = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: boards } = useBoards(useBoardSearchParams())

  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {
          boards?.map(board => (
            <BoardColumns
              board={board}
              key={board.id}
            />
          ))
        }
      </ColumnsContainer>
    </div>
  )
}


const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`
