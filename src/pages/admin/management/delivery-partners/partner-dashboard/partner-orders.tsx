import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Container } from "@mui/material";
import { MainContainer } from "../../../../../components/layout";
import { useQuery } from "@tanstack/react-query";
import { deliveryPartners } from "../../../../../http";
import CommonToolbar from "../../../../../components/admin/common-toolbar";
import OrdersTab from "../../../../../components/admin/orders/orders-dashboard/orders-tab";
import PartnerOrdersListResults from "../../../../../components/admin/delivery-partner/partner-orders-list-results";

export default function RetailerOrders() {
  const { partner_id } = useParams();
  const [searchText, setSearchText] = React.useState("");
  const [orderStatus, setOrderStatus] = React.useState(0);

  const searchHandler = (value: string) => {
    setSearchText(value ? `/search?search_orders=${value}` : "");
  };

  const { data } = useQuery(["delivery-agent-name"], () =>
    deliveryPartners("get", { params: partner_id })
  );

  const partnerName = React.useMemo(() => {
    if (data?.status) return data.data?.partner_name;
    return "";
  }, [data]);

  return (
    <>
      <OrdersTab onSetOrderStatus={setOrderStatus} />
      <MainContainer sx={{ pt: 6 }}>
        <Container>
          <CommonToolbar
            title={`${partnerName} / Partner Orders`}
            onSearch={searchHandler}
            placeholder="search order id"
          />
          <Card sx={{ mt: 1 }}>
            <CardContent sx={{ minHeight: 180 }}>
              <PartnerOrdersListResults
                searchText={searchText}
                orderStatus={orderStatus}
                partnerId={partner_id as string}
              />
            </CardContent>
          </Card>
        </Container>
      </MainContainer>
    </>
  );
}
