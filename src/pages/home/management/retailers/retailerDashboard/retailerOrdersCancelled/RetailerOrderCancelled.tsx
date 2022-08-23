import React from "react";
import AdminContainer from "../../../../../../components/AdminContainer";
import ComingSoonPage from "../../../../../../components/ComingSoonPage";
import MainContainer from "../../../../../../components/common/MainContainer";

export default function RetailerOrderCancelled() {
  return (
    <AdminContainer>
      <MainContainer heading="Cancelled Orders">
        <ComingSoonPage />
      </MainContainer>
    </AdminContainer>
  );
}
