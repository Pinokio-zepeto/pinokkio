import React from "react";
import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Kiosk from "./pages/kiosk/Kiosk";
import Pos from "./pages/pos/Pos";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/kiosk/*", element: <Kiosk /> },
    { path: "/pos/*", element: <Pos /> },
    // 다른 라우트 추가 가능
  ]);
  return routes;
};

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;