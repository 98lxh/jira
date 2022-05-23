import { useProject } from './use-project';
import { useUrlQueryParam } from 'hooks/use-query-param';
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam(['projectCreate'])

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ])

  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

  const open = () => setProjectModalOpen({ projectCreate: true })
  const close = () => {
    setProjectModalOpen({ projectCreate: undefined })
    editingProject && setEditingProjectId({ editingProjectId: undefined })
  }

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
