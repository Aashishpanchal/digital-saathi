import React from "react";
import AdminContainer from "../../../../components/AdminContainer";
import ComingSoonPage from "../../../../components/ComingSoonPage";
import MainContainer from "../../../../components/common/MainContainer";

export default function OrderFulFillment() {
  return (
    <AdminContainer>
      <MainContainer heading="Order Fullfilment">
        <ComingSoonPage />
      </MainContainer>
    </AdminContainer>
  );
}
