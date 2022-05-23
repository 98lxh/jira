import { Button, Drawer, Form, Input, Spin } from "antd"
import { UserSelect } from "components/user-select"
import { useProjectModal } from "./hooks/use-project-modal"
import { useAddProject, useEditProject } from "./hooks/use-project"
import { useForm } from "antd/lib/form/Form"
import { useEffect } from "react"
import { ErrorBox } from "components/lib"
import { useProjectQueryKey } from "./hooks/use-project-params"
import styled from "@emotion/styled"

const Container = styled.div`
  height:80vh;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ProjectModal: React.FC = () => {
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
  const useMutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, error, isLoading: muateLoading } = useMutateProject(useProjectQueryKey())

  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields()
      close()
    })
  }

  const title = editingProject ? "编辑项目" : "创建项目"

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  return (
    <Drawer forceRender={true} width="100%" visible={projectModalOpen} onClose={closeModal}>
      <Container>
        <ErrorBox error={error} />
        {
          isLoading
            ? <Spin size="large"></Spin>
            : <>
              <h1>{title}</h1>
              <Form form={form} layout="vertical" style={{ width: '40rem' }} onFinish={onFinish}>
                <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入项目名' }]}>
                  <Input placeholder="请输入项目名称" />
                </Form.Item>
                <Form.Item label="部门" name="organization" rules={[{ required: true, message: '请输入部门名' }]}>
                  <Input placeholder="请输入部门名" />
                </Form.Item>
                <Form.Item label="负责人" name="personId">
                  <UserSelect
                    defaultOptionName="负责人"
                  />
                </Form.Item>

                <Form.Item style={{ textAlign: "right" }}>
                  <Button loading={muateLoading} type="primary" htmlType="submit">提交</Button>
                </Form.Item>
              </Form>
            </>
        }
      </Container>
    </Drawer >
  )
}
