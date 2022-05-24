import { useUrlQueryParam } from "hooks/use-query-param"
import { useCallback } from "react"
import { useTask } from "./use-task"

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId))

  const startEdit = useCallback((id: number) => {
    setEditingTaskId({ editingTaskId: id })
  }, [setEditingTaskId])

  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' })
  }, [setEditingTaskId])

  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading
  }
}
