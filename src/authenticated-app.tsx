import React from "react"
import { Navigate, Route, Routes } from "react-router"
import { BrowserRouter as Router } from "react-router-dom"
import { Button, Dropdown, Menu } from "antd"
import { ProjectListScreen } from "screens/project-list"
import { Row } from "components/lib"
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
        <Menu
          items={[
            { key: 'logout', label: '退出登录', onClick: logout },
          ]}
        >
        </Menu>
      }>
      <Button type="link">Hi,{user?.name}</Button>
    </Dropdown>
  )
}

const PageHeader: React.FC = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" />
        </Button>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

export const AuthenticatedApp: React.FC = () => {

  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            <Route path="*" element={<Navigate to="/projects" />} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
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
