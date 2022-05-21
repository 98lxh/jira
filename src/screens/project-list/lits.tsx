import React from "react"
import { Table } from "antd"
import { User } from "./search-panel"
import { ColumnsType, TableProps } from "antd/lib/table"
import dayjs from "dayjs"

interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
}

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List: React.FC<ListProps> = ({ users, ...props }) => {

  const columns: ColumnsType<Project> = [
    {
      title: '名称',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '部门',
      dataIndex: 'organization',
    },
    {
      title: '负责人',
      render(_, project) {
        return <span>
          {
            users.find(user => user.id === project.id)?.name || '未知'
          }
        </span>
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      render(_, project) {
        return <span>
          {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
        </span>
      }
    },
  ]

  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={columns}
      {...props}
    />
  )
}
