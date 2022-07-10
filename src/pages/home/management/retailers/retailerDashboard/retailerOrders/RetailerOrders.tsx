import React from "react";
import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../../components/AdminContainer";
import CollapseDropDown from "../../../../../../components/common/CollapseDropDown";
import MainContainer from "../../../../../../components/common/MainContainer";

export default function RetailerOrders() {
  const { retailer_name, retailer_id } = useParams();


  return (
    <AdminContainer>
      <MainContainer heading={`${retailer_name} / Retailer Dashboard`}>
        <CollapseDropDown title="New Orders" color="green">
          No Orders Currently Exit
        </CollapseDropDown>
        <CollapseDropDown title="Accepted Orders" color="green">
          No Orders Currently Exit
        </CollapseDropDown>
        <CollapseDropDown title="In Transit Orders" color="green">
          No Orders Currently Exit
        </CollapseDropDown>
        <CollapseDropDown title="Returned Orders" color="green">
          No Orders Currently Exit
        </CollapseDropDown>
        <CollapseDropDown title="Cancelled Orders" color="green">
          No Orders Currently Exit
        </CollapseDropDown>
      </MainContainer>
    </AdminContainer>
  );
}
