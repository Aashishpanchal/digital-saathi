import React from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { MainContainer } from "../../../../../components/layout";
import RetailerSkuPricingListResults from "../../../../../components/admin/retailers/retailer-sku-pricing/retailer-sku-pricing-list-results";

export default function RetailerSkuPricingUnits() {
  const { retailer_name, retailer_id } = useParams();

  return (
    <MainContainer sx={{ pt: 6 }}>
      <Container>
        <Box mb={2}>
          <Typography variant={"h5"}>
            Data Sku Pricing of / {retailer_name}
          </Typography>
        </Box>
        <Card>
          <CardContent sx={{ minHeight: 180 }}>
            <RetailerSkuPricingListResults retailerId={retailer_id as string} />
          </CardContent>
        </Card>
      </Container>
    </MainContainer>
  );
}
