import React from "react";
import { Route, Routes } from "react-router-dom";
import config from "../configs";
import AuthenticatePage from "../pages/Auth/AuthenticatePage";
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
import DetailProductPage from "../pages/Admin/manage_product/DetailProduct/DetailProductPage";
import EditProductPage from "../pages/Admin/manage_product/EditProduct/EditProductPage";
import BatchPage from "../pages/Admin/manage_batch/ManageBatchPage";
import ManageImportBatchPage from "../pages/Admin/manage_import_product/ManageImportProduct";
import DetailBatchPage from "../pages/Admin/manage_batch/DetailBatch/DetailBatchPage";
import ManageUserPage from "../pages/Admin/manage_users/ManageUserPage";
import UserDetailPage from "../pages/Admin/manage_users/DetailUser/UserDetailPage";
import DashboardPage from "../pages/Admin/manage_dashboard/DashboardPage";
import DetailOrderPage from "../pages/Admin/manage_order/DetailOrder/DetailOrderPage";
import LandingPage from "../pages/Customer/Home/LandingPage";
import ProductCustomerPage from "../pages/Customer/ProductCustomer/ProductPage";
import ProductCustomerDetailPage from "../pages/Customer/ProductCustomer/ProductDetail";

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
          element={<LandingPage />}
        />
        <Route
          key={"productList"}
          path={config.customerRoutes.productList}
          element={<ProductCustomerPage />}
        />
        <Route
          key={"productDetail"}
          path={config.customerRoutes.productDetail}
          element={<ProductCustomerDetailPage />}
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
          key={"dashboardPage"}
          path={config.adminRoutes.dashboard}
          element={<DashboardPage />}
        />
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
          key={"ProductDetail"}
          path={config.adminRoutes.ManageProductDetail}
          element={<DetailProductPage />}
        />
        <Route
          key={"ProductEdit"}
          path={config.adminRoutes.EditProductDetail}
          element={<EditProductPage />}
        />
        <Route
          key={"categories"}
          path={config.adminRoutes.manageCategory}
          element={<ManageCategoryPage />}
        />
        <Route
          key={"batches"}
          path={config.adminRoutes.manageBatch}
          element={<BatchPage />}
        />
        <Route
          key={"batchDetail"}
          path={config.adminRoutes.manageBatchDetail}
          element={<DetailBatchPage />}
        />
        <Route
          key={"importBatches"}
          path={config.adminRoutes.importBatch}
          element={<ManageImportBatchPage />}
        />
        <Route
          key={"ordersAdmin"}
          path={config.adminRoutes.manageOrder}
          element={<ManagerOrderPage />}
        />
        <Route
          key={"ordersDetailAdmin"}
          path={config.adminRoutes.detailOrder}
          element={<DetailOrderPage />}
        />
        <Route
          key={"usersAdmin"}
          path={config.adminRoutes.manageUser}
          element={<ManageUserPage />}
        />
        <Route
          key={"detailUser"}
          path={config.adminRoutes.detailUser}
          element={<UserDetailPage />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoute;
