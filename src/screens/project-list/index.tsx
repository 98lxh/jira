import React from "react"
import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./lits"

import { useMount } from "hooks/useMount"
import { useDebounce } from "hooks/useDebounce"

import { cleanObject } from "utils"

import * as qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [list, setList] = useState([])

  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debounceParam = useDebounce(param, 200)

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debounceParam])

  return <div>
    <SearchPanel param={param} users={users} setParam={setParam} />
    <List list={list} users={users} />
  </div>
}