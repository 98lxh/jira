import React from "react";
import { Button, Col, Input, Row } from "antd";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import { useSetUrlSearchParams } from "hooks/use-query-param";
import { useTasksSearchParams } from "./hooks/use-board-params";


export const SearchPanel: React.FC = () => {
  const searchParams = useTasksSearchParams()
  const setSearchParams = useSetUrlSearchParams()
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined
    })
  }

  return (
    <Row style={{ marginBottom: '4rem' }}>
      <Input
        style={{ width: '20rem', marginRight: '5rem' }}
        placeholder="人物名"
        onChange={evt => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        style={{ marginRight: '5rem' }}
        defaultOptionName="经办人"
        value={searchParams.processorId}
        onChange={value => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        style={{ marginRight: '5rem' }}
        defaultOptionName="类型"
        value={searchParams.typeId}
        onChange={value => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  )
}
