import React from "react";
import { Route, Routes } from "react-router-dom";
import config from "../configs";
import AuthenticatePage from "../pages/Auth/AuthenticatePage";
// import Home from "../pages/Home/HomePage";

const AppRoute: React.FC = () => {
  return (
    <Routes>
      <Route
        key={"Login"}
        path={config.managerRoutes.home}
        element={<AuthenticatePage />}
      />
    </Routes>
  );
};

export default AppRoute;
