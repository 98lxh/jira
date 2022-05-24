import { useState } from "react"
import { useProjectIdInUrl } from "hooks/use-project-in-url"
import { useAddBoard } from "./hooks/use-board"
import { useBoardQueryKey } from "./hooks/use-board-params"
import { Input } from "antd"
import { Container } from "./board-columns"

export const CreateBoard: React.FC = () => {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addBoard } = useAddBoard(useBoardQueryKey())


  const submit = async () => {
    await addBoard({ name, projectId })
    setName('')
  }

  return (
    <Container>
      <Input
        size="large"
        placeholder="新建看板名称"
        onPressEnter={submit}
        value={name}
        onChange={evt => {
          setName(evt.target.value)
        }}
      />
    </Container>
  )
}
