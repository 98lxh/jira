import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes, Navigate, useLocation } from "react-router";
import { EpicScreen } from "screens/epic";
import { BoardScreen } from "screens/board";
import { Menu } from "antd";
import styled from "@emotion/styled";

const useRouteType = () => {
  const units = useLocation().pathname.split("/")

  return units[units.length - 1]
}


export const ProjectScreen: React.FC = () => {
  const routeType = useRouteType()

  return (
    <Container>
      <Aside>
        <Menu
          mode="inline"
          selectedKeys={[routeType]}
          items={[
            {
              key: "board",
              label: (<Link to="board">看板</Link>),
            },
            {
              key: 'epic',
              label: (<Link to="epic">任务组</Link>)
            }
          ]}
        />
      </Aside>
      <Main>
        <Routes>
          <Route path="/board" element={<BoardScreen />}></Route>
          <Route path="/epic" element={<EpicScreen />}></Route>
          <Route path="*" element={<Navigate to={window.location.pathname + "/board"} replace={true} />} />
        </Routes>
      </Main>
    </Container>
  )
}


const Aside = styled.aside`
  background-color: rgb(244,245,257);
  display: flex;
`

const Main = styled.main`
  box-shadow: -5px 0 5px -5px rgba(0,0,0,0.1);
  display: flex;
  overflow: hidden;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`
