import React from "react"
import { Form, Input } from "antd"
import { Project } from "types/project"
import { UserSelect } from "components/user-select"
import { User } from "types/user"

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
