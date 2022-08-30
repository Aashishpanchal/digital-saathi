import React from "react";
import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../../components/AdminContainer";
import MainContainer from "../../../../../../components/common/MainContainer";
import MainRetailerOrders from "./MainRetailerOrders";

export default function RetailerOrders() {
  const { retailer_name, retailer_id } = useParams();

  const Lists = React.useMemo(
    () => [
      {
        title: "New Order",
        order_status: 0,
      },
      {
        title: "Accepted Orders",
        order_status: 1,
      },
      {
        title: "In Transit Orders",
        order_status: 2,
      },
      {
        title: "Returned Orders",
        order_status: 3,
      },
      {
        title: "Cancelled Orders",
        order_status: 4,
      },
    ],
    []
  );

  return (
    <AdminContainer>
      <MainContainer heading={`${retailer_name} / Retailer Orders`}>
        <div className="flex flex-col space-y-5">
          {Lists.map((item, index) => (
            <MainRetailerOrders
              key={index.toString()}
              retailer_id={retailer_id as string}
              order_status={item.order_status}
              title={item.title}
            />
          ))}
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
