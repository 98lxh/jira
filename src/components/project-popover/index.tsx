import React from "react";
import { Divider, Popover, Typography } from "antd";
// import { useProjects } from "screens/project-list/hooks/use-project";
// import { useProjectsSearchParams } from "screens/project-list/hooks/use-project-params";
// import { useDebounce } from "hooks/use-debounce";
import styled from "@emotion/styled";
import { ButtonNoPadding, TextNotSelect } from "components/lib";
import { useProjectModal } from "screens/project-list/hooks/use-project-modal";

export const ProjectPopover: React.FC = () => {
  // const { data: projects, isLoading } = useProjects()
  const { open } = useProjectModal()

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
    <ButtonNoPadding type="link" onClick={open}>
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
