import React from "react"
import { Link } from "react-router-dom"
import { Dropdown, Menu, Modal, Table } from "antd"
import { ColumnsType, TableProps } from "antd/lib/table"
import { User } from "./search-panel"
import { Pin } from "components/pin"
import { ButtonNoPadding } from "components/lib"
import { useProjectModal } from "./hooks/use-project-modal"
import { useDeleteProject, useEditProject } from "./hooks/use-project"
import { useProjectQueryKey } from "./hooks/use-project-params"
import dayjs from "dayjs"


export interface Project {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}

interface ListProps extends TableProps<Project> {
  users: User[],
}

export const List: React.FC<ListProps> = ({ users, ...props }) => {
  const { mutate } = useEditProject(useProjectQueryKey())

  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

  const columns: ColumnsType<Project> = [
    {
      title: <Pin checked={true} disabled={true} />,
      render(_, project) {
        return <Pin
          checked={project.pin}
          onCheckedChange={pinProject(project.id)} />
      }
    },
    {
      title: '名称',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(_, project) {
        return <Link to={String(project.id)}>{project.name}</Link>
      }
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
            users.find(user => user.id === project.personId)?.name || '未知'
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
    {
      render(_, project) {
        return <More project={project} />
      }
    }
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

const More: React.FC<{ project: Project }> = ({ project }) => {
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey())

  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确认删除这个项目吗?',
      content: '点击确认后，项目将被删除，无法恢复',
      okText: '确认',
      onOk: () => deleteProject({ id })
    })
  }

  return (
    <Dropdown overlay={<Menu
      items={[
        {
          key: 'edit',
          label: '编辑',
          onClick: editProject(project.id)
        },
        {
          key: 'delete',
          label: '删除',
          onClick: () => confirmDeleteProject(project.id)
        }
      ]}>
    </Menu>}
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  )
}
