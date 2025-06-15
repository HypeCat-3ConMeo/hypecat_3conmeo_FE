import React from "react";
import { Route, Routes } from "react-router-dom";
import config from "../configs";
import Login from "../containers/authenticate/Login";
// import Home from "../pages/Home/HomePage";

const AppRoute: React.FC = () => {
  return (
    <Routes>
      <Route
        key={"Login"}
        path={config.managerRoutes.home}
        element={<Login />}
      />
    </Routes>
  );
};

export default AppRoute;
