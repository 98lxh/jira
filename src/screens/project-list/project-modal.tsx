import { Button, Drawer } from "antd"

export const ProjectModal: React.FC<{ projectModalOpen: boolean, onClose: () => void }> = (props) => {


  return (
    <Drawer width="100%" visible={props.projectModalOpen} onClose={() => props.onClose()}>
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  )
}
