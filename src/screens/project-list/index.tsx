import React from "react"
import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./lits"
import { useMount } from "hooks/useMount"
import { useDebounce } from "hooks/useDebounce"
import { cleanObject } from "utils"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"

export const ProjectListScreen: React.FC = () => {
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

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
    clinet('projects', { data: cleanObject(debounceParam) }).then(setList)
  }, [debounceParam])

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} users={users} setParam={setParam} />
      <List list={list} users={users} />
    </Container>
  )
}


const Container = styled.div`
  padding: 3.2rem;
`
