import type React from "react";
import ProductTable from "../../../containers/product/ProductTable";
import ContainerWrapper from "../../../components/Container";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";

const ProductPage: React.FC = () => {
  return (
    <>
      <ContainerWrapper>
        <HeaderBreadcrumbs
          heading="Quản lý sản phẩm"
          links={[
            {
              name: "Sản phaẩm",
            },
          ]}
        />

        <ProductTable />
      </ContainerWrapper>
    </>
  );
};

export default ProductPage;
