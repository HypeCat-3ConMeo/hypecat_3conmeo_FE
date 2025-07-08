import React from "react";
import { Route, Routes } from "react-router-dom";
import config from "../configs";
import AuthenticatePage from "../pages/Auth/AuthenticatePage";
import Home from "../pages/Customer/Home/home";
import CustomerLayout from "../layouts/CustomerLayout/CustomerLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import ProductPage from "../pages/Admin/manage_product/ManageProductPage";
import CreateProductPage from "../pages/Admin/manage_product/CreateProduct/CreateProductPage";
import ManageCategoryPage from "../pages/Admin/manage_category/ManageCategory";
import ProfilePage from "../pages/Customer/Profile/Profile";
import AddressPage from "../pages/Customer/Address/Address";
import ManagerOrderPage from "../pages/Admin/manage_order/ManageOrderPage";
import OrderPage from "../pages/Customer/Order/Order";
import InformationLayout from "../layouts/InformationLayout/InformationLayout";

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
      <Route key={"profile"} element={<InformationLayout />}>
        <Route
          key={"profile"}
          path={config.customerRoutes.userProfile}
          element={<ProfilePage />}
        />
        <Route
          key={"orders"}
          path={config.customerRoutes.order}
          element={<OrderPage />}
        />
        <Route
          key={"addresses"}
          path={config.customerRoutes.address}
          element={<AddressPage />}
        />
      </Route>

      <Route key={"dashboard"} element={<AdminLayout />}>
        <Route
          key={"products"}
          path={config.adminRoutes.manageProduct}
          element={<ProductPage />}
        />
        <Route
          key={"createProduct"}
          path={config.adminRoutes.CreateProduct}
          element={<CreateProductPage />}
        />
        <Route
          key={"categories"}
          path={config.adminRoutes.manageCategory}
          element={<ManageCategoryPage />}
        />
        <Route
          key={"categories"}
          path={config.adminRoutes.manageOrder}
          element={<ManageCategoryPage />}
        />
      </Route>
    </Routes >
  );
};

export default AppRoute;
