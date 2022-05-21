import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { EpicScreen } from "screens/epic";
import { BoardScreen } from "screens/board";

export const ProjectScreen: React.FC = () => {

  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to="board">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        <Route path="/board" element={<BoardScreen />}></Route>
        <Route path="/epic" element={<EpicScreen />}></Route>
        <Route path="*" element={<Navigate to={window.location.pathname + "/board"} />} />
      </Routes>
    </div>
  )
}
