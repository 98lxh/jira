import React, { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { useTasksModal } from "./hooks/use-task-modal";
import { useDeleteTask, useEditTask } from "./hooks/use-task";
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";
import { useTasksQueryKey } from "./hooks/use-board-params";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

export const TaskModal: React.FC = () => {
  const [form] = useForm()
  const { editingTask, editingTaskId, close } = useTasksModal()
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey())
  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey())

  const onCancel = () => {
    close()
    form.resetFields()
  }

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() })
    close()
  }

  const startDelete = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除任务吗',
      onOk: async () => {
        await deleteTask({ id: Number(editingTaskId) })
        close()
      }
    })
  }

  useEffect(() => {
    form.setFieldsValue(editingTask)
  }, [form, editingTask])

  return (
    <Modal
      okText="确认"
      cancelText="取消"
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={editLoading}
      title="编辑任务"
      visible={!!editingTaskId}
      forceRender={true}
    >
      <Form
        {...layout}
        initialValues={editTask}
        form={form}
      >
        <Form.Item label="任务名" name="name" rules={[{ required: true, message: '请输入任务名' }]}>
          <Input placeholder="请输入任务名" />
        </Form.Item>
        <Form.Item label="经办人" name="processorId">
          <UserSelect defaultOptionName="经办人" />
        </Form.Item>
        <Form.Item label="任务类型" name="typeId">
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'right' }}>
        <Button
          style={{ fontSize: '14px' }}
          size="small"
          onClick={startDelete}
        >
          删除
        </Button>
      </div>
    </Modal>
  )
}
