import React from "react";
import AdminContainer from "../../../../../../components/AdminContainer";
import ComingSoonPage from "../../../../../../components/ComingSoonPage";
import MainContainer from "../../../../../../components/common/MainContainer";

export default function RetailerSkuPricing() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image",
      },
      {
        Header: "SKU Code",
        accessor: "sku_code",
      },
      {
        Header: "Category/Sub-Category",
        accessor: "category_sub_category",
      },
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Action",
        Cell: (cell: any) => <>45</>,
      },
    ],
    []
  );
  return (
    <AdminContainer>
      <MainContainer heading="Data SKU Pricing">
        <ComingSoonPage />
      </MainContainer>
    </AdminContainer>
  );
}
