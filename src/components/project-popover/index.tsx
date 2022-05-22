import React from "react";
import { Divider, Popover, Typography } from "antd";
// import { useProjects } from "screens/project-list/hooks/use-project";
import { useDispatch } from "react-redux"
import styled from "@emotion/styled";
import { ButtonNoPadding, TextNotSelect } from "components/lib";
import { projectListActions } from "screens/project-list/project-list.slice";

export const ProjectPopover: React.FC = () => {
  // const { data: projects, isLoading } = useProjects()

  const dispatch = useDispatch()
  const content = <ContentContainer>
    <Typography.Text type="secondary">收藏项目</Typography.Text>
    {/* <List>
      {
        pinnedProjects?.map(project => (
          <List.Item.Meta
            key={project.id}
            title={project.name}
          />
        ))
      }
    </List> */}
    <Divider />
    <ButtonNoPadding
      type="link"
      onClick={() => dispatch(projectListActions.openProjectModal())}
    >
      创建项目
    </ButtonNoPadding>
  </ContentContainer>

  return (
    <Popover
      placement="bottom"
      content={content}
    >
      <TextNotSelect>项目</TextNotSelect>
    </Popover>
  )
}


const ContentContainer = styled.div`
  min-width: 30rem;
`
