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
import styled from "@emotion/styled"

const PageHeader = () => {
  const { logout, user } = useAuth()

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" />
        </Button>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight onClick={logout}>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button type="link">登出</Button>
              </Menu.Item>
            </Menu>
          }>
          <Button type="link">Hi,{user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

export const AuthenticatedApp: React.FC = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            <Route path="*" element={<Navigate to="/projects" />} />
          </Routes>
        </Router>
      </Main>
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
