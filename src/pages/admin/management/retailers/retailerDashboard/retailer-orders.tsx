import React from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { RetailerOrdersListResults } from "../../../../../components/admin/retailers/retailer-orders";
import { RetailerOrdersTab } from "../../../../../components/admin/retailers/retailer-orders";
import { MainContainer } from "../../../../../components/layout";

export default function RetailerOrders() {
  const { retailer_name /* ,retailer_id */ } = useParams();
  const [orderStatus, setOrderStatus] = React.useState(0);

  return (
    <>
      <RetailerOrdersTab onSetOrderStatus={setOrderStatus} />
      <MainContainer sx={{ pt: 6 }}>
        <Container>
          <Box mb={2}>
            <Typography variant={"h5"}>
              Retailer Orders / {retailer_name}
            </Typography>
          </Box>
          <Card>
            <CardContent sx={{ minHeight: 180 }}>
              <RetailerOrdersListResults orderStatus={orderStatus} />
            </CardContent>
          </Card>
        </Container>
      </MainContainer>
    </>
  );
}
