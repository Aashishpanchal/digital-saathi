import React from "react";
import AdminContainer from "../../../components/AdminContainer";
import ComingSoonPage from "../../../components/ComingSoonPage";
import MainContainer from "../../../components/common/MainContainer";

export default function OrderDetails() {
  return (
    <AdminContainer>
      <MainContainer heading="Order Details">
        <ComingSoonPage />
      </MainContainer>
    </AdminContainer>
  );
}
