import React from "react";
import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../../components/AdminContainer";
import ComingSoonPage from "../../../../../../components/ComingSoonPage";
import MainContainer from "../../../../../../components/common/MainContainer";

export default function RetailerSkuPricing() {
  const { retailer_name, retailer_id } = useParams();
  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "Image",
  //       accessor: "image",
  //     },
  //     {
  //       Header: "SKU Code",
  //       accessor: "sku_code",
  //     },
  //     {
  //       Header: "Category/Sub-Category",
  //       accessor: "category_sub_category",
  //     },
  //     {
  //       Header: "Brand",
  //       accessor: "brand",
  //     },
  //     {
  //       Header: "Action",
  //       Cell: (cell: any) => <>45</>,
  //     },
  //   ],
  //   []
  // );
  return (
    <AdminContainer>
      <MainContainer heading={`${retailer_name} / Data SKU Pricing`}>
        <ComingSoonPage />
      </MainContainer>
    </AdminContainer>
  );
}
