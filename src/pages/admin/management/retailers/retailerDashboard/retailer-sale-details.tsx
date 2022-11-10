import React from "react";
import { useParams } from "react-router-dom";
import { retailer } from "../../../../../http";
import { useQuery } from "@tanstack/react-query";
import MainOrders from "../../../orders/main-orders";

export default function retailerSaleDetails() {
  const { retailer_id } = useParams();

  const { data } = useQuery(["retailer-name"], () =>
    retailer("get", { params: retailer_id })
  );

  const retailerName = React.useMemo(() => {
    if (data?.status) return data.data?.retailer_name;
    return "";
  }, [data]);
  return (
    <MainOrders
      orderStatus={5}
      filename="input-sale-details"
      title={`${retailerName} / Input Sale Details`}
    />
  );
}
