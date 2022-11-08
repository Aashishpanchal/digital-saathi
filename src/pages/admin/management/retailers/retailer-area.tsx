import React from "react";
import { Container, Box } from "@mui/material";
import { MainContainer } from "../../../../components/layout";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import ComingSoonPage from "../../../../components/ComingSoonPage";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { retailer } from "../../../../http";

export default function RetailerArea() {
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
        <CommonToolbar title={`${retailerName} / Retailer Area`} />
      </Container>
      <Box mt={2}>
        <ComingSoonPage />
      </Box>
    </MainContainer>
  );
}
