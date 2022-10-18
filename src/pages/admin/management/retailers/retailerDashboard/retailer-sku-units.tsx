import React from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { MainContainer } from "../../../../../components/layout";
import {
  RetailerSkuListResults,
  RetailerSkuUnitTab,
} from "../../../../../components/admin/retailers/retailer-sku-units";

export default function RetailerSkuUnits() {
  const { retailer_name, retailer_id } = useParams();
  const [value, setValue] = React.useState(0);

  return (
    <>
      <RetailerSkuUnitTab onChange={setValue} value={value} />
      <MainContainer sx={{ pt: 6 }}>
        <Container>
          <Box mb={2}>
            <Typography variant={"h5"}>
              Retailer Orders / {retailer_name}
            </Typography>
          </Box>
          <Card>
            <CardContent sx={{ minHeight: 180 }}>
              <RetailerSkuListResults
                tab={value}
                retailerId={retailer_id as string}
              />
            </CardContent>
          </Card>
        </Container>
      </MainContainer>
    </>
  );
}
