import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Container } from "@mui/material";
import { RetailerOrdersListResults } from "../../../../../components/admin/retailers/retailer-orders";
import { RetailerOrdersTab } from "../../../../../components/admin/retailers/retailer-orders";
import { MainContainer } from "../../../../../components/layout";
import { useQuery } from "@tanstack/react-query";
import { retailer } from "../../../../../http";
import CommonToolbar from "../../../../../components/admin/common-toolbar";

export default function RetailerOrders() {
  const { retailer_id } = useParams();
  const [searchText, setSearchText] = React.useState("");
  const [orderStatus, setOrderStatus] = React.useState(0);

  const searchHandler = (value: string) => {
    setSearchText(value ? `/search?search_orders=${value}` : "");
  };

  const { data } = useQuery(["retailer-name"], () =>
    retailer("get", { params: retailer_id })
  );

  const retailerName = React.useMemo(() => {
    if (data?.status) return data.data?.retailer_name;
    return "";
  }, [data]);

  return (
    <>
      <RetailerOrdersTab onSetOrderStatus={setOrderStatus} />
      <MainContainer sx={{ pt: 6 }}>
        <Container>
          <CommonToolbar
            title={`${retailerName} / Retailer Orders`}
            onSearch={searchHandler}
            placeholder="search order id"
          />
          <Card sx={{ mt: 1 }}>
            <CardContent sx={{ minHeight: 180 }}>
              <RetailerOrdersListResults
                searchText={searchText}
                orderStatus={orderStatus}
                retailerId={retailer_id as string}
              />
            </CardContent>
          </Card>
        </Container>
      </MainContainer>
    </>
  );
}
