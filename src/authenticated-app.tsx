import React, { useState } from "react"
import { Navigate, Route, Routes } from "react-router"
import { BrowserRouter as Router } from "react-router-dom"
import { Button, Dropdown, Menu } from "antd"
import { ProjectListScreen } from "screens/project-list"
import { ButtonNoPadding, Row } from "components/lib"
import { useAuth } from "context/auth-context"
import { ReactComponent as SoftwareLogo } from "assets/logo.svg";
import { ProjectScreen } from "screens/project"
import { resetRoute } from "utils/reset-route"
import { ProjectModal } from "screens/project-list/project-modal"
import { ProjectPopover } from "components/project-popover"
import styled from "@emotion/styled"


const User = () => {
  const { user, logout } = useAuth()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="logout">
            <ButtonNoPadding type="link" onClick={logout}>登出</ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }>
      <Button type="link">Hi,{user?.name}</Button>
    </Dropdown>
  )
}

const PageHeader: React.FC<{ projectButton: JSX.Element }> = (props) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" />
        </Button>
        <ProjectPopover {...props} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

export const AuthenticatedApp: React.FC = () => {
  const [projecModaltOpen, setProjecModalOpen] = useState(false)

  const projectButton = <ButtonNoPadding type="link" onClick={() => setProjecModalOpen(true)}>创建项目</ButtonNoPadding>

  return (
    <Container>
      <PageHeader
        projectButton={projectButton}
      />
      <Button onClick={() => setProjecModalOpen(true)}>打开</Button>
      <Main>
        <Router>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen projectButton={projectButton} />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            <Route path="*" element={<Navigate to="/projects" />} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal projectModalOpen={projecModaltOpen} onClose={() => setProjecModalOpen(false)} />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.div``;
