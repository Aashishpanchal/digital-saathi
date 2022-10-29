import React from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { RetailerOrdersListResults } from "../../../../../components/admin/retailers/retailer-orders";
import { RetailerOrdersTab } from "../../../../../components/admin/retailers/retailer-orders";
import { MainContainer } from "../../../../../components/layout";
import { useQuery } from "@tanstack/react-query";
import { retailer } from "../../../../../http";

export default function RetailerOrders() {
  const { retailer_id } = useParams();
  const [orderStatus, setOrderStatus] = React.useState(0);

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
          <Box mb={2}>
            <Typography variant={"h5"}>
              {retailerName} / Retailer Orders
            </Typography>
          </Box>
          <Card>
            <CardContent sx={{ minHeight: 180 }}>
              <RetailerOrdersListResults
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
