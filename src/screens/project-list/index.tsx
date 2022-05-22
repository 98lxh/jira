import React from "react"
import { Row, Typography } from "antd"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useProjects } from "screens/project-list/hooks/use-project"
import { useDebounce } from "hooks/use-debounce"
import { useUsers } from "./hooks/use-user"
import { useProjectsSearchParams } from "./hooks/use-project-params"
import { useDocumentTitle } from "hooks/use-document-title"
import { ButtonNoPadding } from "components/lib"
import { useDispatch } from "react-redux"
import { projectListActions } from "./project-list.slice"
import styled from "@emotion/styled"

export const ProjectListScreen: React.FC = () => {
  const [param, setParam] = useProjectsSearchParams()
  const { error, isLoading, data: list, retry } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()
  const dispatch = useDispatch()

  useDocumentTitle('项目列表', false)

  return (
    <Container>
      <Row justify="space-between">
        <h1>项目列表</h1>
        <ButtonNoPadding
          type="link"
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List refresh={retry} loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}


const Container = styled.div`
  padding: 3.2rem;
`
