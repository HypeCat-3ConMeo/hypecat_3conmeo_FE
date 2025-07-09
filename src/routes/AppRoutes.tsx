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
import DetailProductPage from "../pages/Admin/manage_product/DetailProduct/DetailProductPage";
import EditProductPage from "../pages/Admin/manage_product/EditProduct/EditProductPage";
import BatchPage from "../pages/Admin/manage_batch/ManageBatchPage";
import ManageImportBatchPage from "../pages/Admin/manage_import_product/ManageImportProduct";
import DetailBatchPage from "../pages/Admin/manage_batch/DetailBatch/DetailBatchPage";

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
      </Route>
    </Routes>
  );
};

export default AppRoute;
