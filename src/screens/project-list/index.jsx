import React from "react"
import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./lits"
import { cleanObejct } from "utils"
import qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {

  const [list, setList] = useState([])

  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObejct(param))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [param])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])

  return <div>
    <SearchPanel param={param} users={users} setParam={setParam} />
    <List list={list} users={users} />
  </div>
}
