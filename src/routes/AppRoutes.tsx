import React from "react";
import { Route, Routes } from "react-router-dom";
import config from "../configs";
import AuthenticatePage from "../pages/Auth/AuthenticatePage";
import Home from "../pages/Customer/Home/home";
import CustomerLayout from "../layouts/CustomerLayout/CustomerLayout";
// import Home from "../pages/Home/HomePage";

const AppRoute: React.FC = () => {
  return (
    <Routes>
      <Route
        key={"Login"}
        path={config.authRoutes.authenticate}
        element={<AuthenticatePage />}
      />

      <Route key={"home"} element={<CustomerLayout />}>
        <Route
          key={"news"}
          path={config.customerRoutes.home}
          element={<Home />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoute;
