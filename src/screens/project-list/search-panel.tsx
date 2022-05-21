import React from "react"
import { Form, Input, Select } from "antd"

export interface User {
  id: string
  name: string
  email: string
  organization: string
  token: string
}

interface SearchPanelProps {
  users: User[],
  param: {
    name: string,
    personId: string
  },
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
        <Select
          value={param.personId}
          onChange={value => setParam({
            ...param,
            personId: value
          })}
        >
          <Select.Option value="">负责人</Select.Option>
          {
            users.map(user => (
              <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>
            ))
          }
        </Select>
      </Form.Item>
    </Form>
  )
}
