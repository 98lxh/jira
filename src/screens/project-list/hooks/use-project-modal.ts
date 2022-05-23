import { useProject } from './use-project';
import { useSetUrlSearchParams, useUrlQueryParam } from 'hooks/use-query-param';
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam(['projectCreate'])

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ])

  const setUrlParams = useSetUrlSearchParams()

  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

  const open = () => setProjectModalOpen({ projectCreate: true })

  const close = () => setUrlParams({ projectCreate: '', editingProjectId: '' })

  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    close,
    open,
    startEdit,
    editingProject,
    isLoading
  }
}
