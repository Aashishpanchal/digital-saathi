import React from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { MainContainer } from "../../../../../components/layout";
import {
  RetailerSkuListResults,
  RetailerSkuUnitTab,
} from "../../../../../components/admin/retailers/retailer-sku-units";
import { useQuery } from "@tanstack/react-query";
import { retailer } from "../../../../../http";

export default function RetailerSkuUnits() {
  const { retailer_id } = useParams();
  const [value, setValue] = React.useState(0);

  const { data } = useQuery(["retailer-name"], () =>
    retailer("get", { params: retailer_id })
  );

  const retailerName = React.useMemo(() => {
    if (data?.status) return data.data?.retailer_name;
    return "";
  }, [data]);

  return (
    <>
      <RetailerSkuUnitTab onChange={setValue} value={value} />
      <MainContainer sx={{ pt: 6 }}>
        <Container>
          <Box mb={2}>
            <Typography variant={"h5"}>
              {retailerName} / Retailer Orders
            </Typography>
          </Box>
          <Card>
            <CardContent sx={{ minHeight: 180 }}>
              {value === 0 ? (
                <RetailerSkuListResults
                  key={value}
                  variant="assign"
                  retailerId={retailer_id as string}
                />
              ) : (
                <RetailerSkuListResults
                  key={value}
                  variant="unassign"
                  retailerId={retailer_id as string}
                />
              )}
            </CardContent>
          </Card>
        </Container>
      </MainContainer>
    </>
  );
}
