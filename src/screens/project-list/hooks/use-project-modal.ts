import { useUrlQueryParam } from 'hooks/use-query-param';
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam(['projectCreate'])

  const open = () => setProjectModalOpen({ projectCreate: true })
  const close = () => setProjectModalOpen({ projectCreate: undefined })

  return {
    projectModalOpen: projectCreate === 'true',
    close,
    open,
  }
}
