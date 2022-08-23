import React from "react";
import AdminContainer from "../../../../components/AdminContainer";
import ComingSoonPage from "../../../../components/ComingSoonPage";
import MainContainer from "../../../../components/common/MainContainer";

export default function InvoiceWiseDelivery() {
  return (
    <AdminContainer>
      <MainContainer heading="Invoice Wise Delivery Status">
        <ComingSoonPage />
      </MainContainer>
    </AdminContainer>
  );
}
