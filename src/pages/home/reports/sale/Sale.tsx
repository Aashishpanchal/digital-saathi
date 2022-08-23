import React from "react";
import AdminContainer from "../../../../components/AdminContainer";
import ComingSoonPage from "../../../../components/ComingSoonPage";
import MainContainer from "../../../../components/common/MainContainer";

export default function Sale() {
  return (
    <AdminContainer>
      <MainContainer heading="Sale">
        <ComingSoonPage />
      </MainContainer>
    </AdminContainer>
  );
}
