import React from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { MainContainer } from "../../../../../components/layout";
import RetailerSkuPricingListResults from "../../../../../components/admin/retailers/retailer-sku-pricing/retailer-sku-pricing-list-results";
import { useQuery } from "@tanstack/react-query";
import { retailer } from "../../../../../http";

export default function RetailerSkuPricingUnits() {
  const { retailer_id } = useParams();

  const { data } = useQuery(["retailer-name"], () =>
    retailer("get", { params: retailer_id })
  );

  const retailerName = React.useMemo(() => {
    if (data?.status) return data.data?.retailer_name;
    return "";
  }, [data]);

  return (
    <MainContainer>
      <Container>
        <Box mb={2}>
          <Typography variant={"h5"}>
            {retailerName} / Data Sku Pricing
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
