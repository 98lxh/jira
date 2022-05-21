import React from "react"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import styled from "@emotion/styled"
import { Row } from "components/lib"
import { ReactComponent as SoftwareLogo } from "assets/logo.svg";
import { Button, Dropdown, Menu } from "antd"

export const AuthenticatedApp: React.FC = () => {
  const { logout, user } = useAuth()

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width="18rem" />
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
      <Main>
        <ProjectListScreen />
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
