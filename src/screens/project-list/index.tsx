import React from "react"
import { Row } from "antd"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useProjects } from "screens/project-list/hooks/use-project"
import { useDebounce } from "hooks/use-debounce"
import { useUsers } from "./hooks/use-user"
import { useProjectsSearchParams } from "./hooks/use-project-params"
import { useDocumentTitle } from "hooks/use-document-title"
import styled from "@emotion/styled"
import { useProjectModal } from "./hooks/use-project-modal"
import { ButtonNoPadding, ErrorBox } from "components/lib"

export const ProjectListScreen: React.FC = (props) => {
  const [param, setParam] = useProjectsSearchParams()
  const { open } = useProjectModal()
  const { error, isLoading, data: list } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()

  useDocumentTitle('项目列表', false)

  return (
    <Container>
      <Row justify="space-between">
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}


const Container = styled.div`
  padding: 3.2rem;
`
