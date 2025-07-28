import ContainerWrapper from "../../../components/Container";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import CTabs from "../../../components/tabs/CTabs";
import config from "../../../configs";
import CategoryTable from "../../../containers/category/CategoryTable";
import NewsTable from "../../../containers/news/NewsTable";

const ManageCategoryPage = () => {
  const tabsLabel = [
    {
      label: "Loại sản phẩm",
      content: <CategoryTable />,
    },
    {
      label: "Bài viết",
      content: <NewsTable role="admin" />,
    },
  ];
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

        <CTabs tabs={tabsLabel} />
      </ContainerWrapper>
    </>
  );
};

export default ManageCategoryPage;
