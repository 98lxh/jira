import React from "react"
import { Table } from "antd"
import { User } from "./search-panel"
import { ColumnsType } from "antd/lib/table"

interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
}

interface ListProps {
  list: Project[]
  users: User[]
}

export const List: React.FC<ListProps> = ({ list, users }) => {

  const columns: ColumnsType<Project> = [
    {
      title: '名称',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: '负责人',
      render(_, project) {
        return <span>
          {
            users.find(user => user.id === project.id)?.name || '未知'
          }
        </span>
      }
    }
  ]

  return <Table pagination={false} columns={columns} dataSource={list} />
}
