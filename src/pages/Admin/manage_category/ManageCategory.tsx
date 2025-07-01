import ContainerWrapper from "../../../components/Container";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import config from "../../../configs";
import CategoryTable from "../../../containers/category/CategoryTable";

const ManageCategoryPage = () => {
  return (
    <>
      <ContainerWrapper>
        <HeaderBreadcrumbs
          heading="Quản lý loại sản phẩm"
          links={[
            {
              name: "Bảng Thống Kê",
              href: config.adminRoutes.dashboard,
            },
            {
              name: "Loại sản phẩm",
            },
          ]}
        />

        <CategoryTable />
      </ContainerWrapper>
    </>
  );
};

export default ManageCategoryPage;
