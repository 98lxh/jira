import React, { useState } from "react"
import { Typography } from "antd"
import { List } from "./lits"
import { SearchPanel } from "./search-panel"
import { useProjects } from "screens/project-list/hooks/use-project"
import { useDebounce } from "hooks/use-debounce"
import { useUsers } from "./hooks/use-user"
import styled from "@emotion/styled"
import { useDocumentTitle } from "hooks/use-document-title"

export const ProjectListScreen: React.FC = () => {

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debounceParam = useDebounce(param, 200)

  const { error, isLoading, data: list } = useProjects(debounceParam)
  const { data: users } = useUsers()

  useDocumentTitle('项目列表', false)

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}


const Container = styled.div`
  padding: 3.2rem;
`
