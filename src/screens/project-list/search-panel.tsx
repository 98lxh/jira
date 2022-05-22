import React from "react"
import { Form, Input } from "antd"
import { Project } from "./list"
import { UserSelect } from "components/user-select"

export interface User {
  id: number
  name: string
  email: string
  organization: string
  token: string
}

interface SearchPanelProps {
  users: User[],
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel: React.FC<SearchPanelProps> = ({ param, setParam, users }) => {
  return (
    <Form layout="inline" style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          placeholder="项目名"
          onChange={e => setParam({
            ...param,
            name: e.target.value
          })}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          defaultOptionName="负责人"
          onChange={value => setParam({
            ...param,
            personId: value
          })}
        />
      </Form.Item>
    </Form>
  )
}
