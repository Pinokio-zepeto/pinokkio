import React from "react";
import { Routes, Route, Router, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./components/kiosk/Menu";
import Kiosk from "./pages/kiosk/Kiosk";

// const menuroute = () => {
//   let routes = useRoutes([
//     { path: "/", element: <Login /> },
//     { path: "/about", element: <category /> },
//     // 다른 라우트 추가
//   ]);
//   return routes;
// };

function App() {
  return (
    <div className="App">
      <Kiosk />
      
    </div>
  );
}

export default App;
