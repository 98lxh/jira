import React from "react"
import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./lits"
import { useMount } from "hooks/use-mount"
import { useDebounce } from "hooks/use-debounce"
import { cleanObject } from "utils"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"
import { Typography } from "antd"

export const ProjectListScreen: React.FC = () => {
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const clinet = useHttp()

  const debounceParam = useDebounce(param, 200)

  useMount(() => {
    clinet('users').then(setUsers)
  })

  useEffect(() => {
    setLoading(true)
    clinet('projects', { data: cleanObject(debounceParam) })
      .then(setList)
      .catch(error => {
        setError(error)
        setList([])
      })
      .finally(() => {
        setLoading(false)
      })

    // eslint-disable-next-line
  }, [debounceParam])

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} users={users} setParam={setParam} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List loading={loading} dataSource={list} users={users} />
    </Container>
  )
}


const Container = styled.div`
  padding: 3.2rem;
`
