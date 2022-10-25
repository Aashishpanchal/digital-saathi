import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import FarmersOrdersListResults from "../../../../components/admin/farmers/farmers-orders-list-results";
import { MainContainer } from "../../../../components/layout";

export default function FarmersOrders() {
  const { customer_id } = useParams();
  const [searchText, setSearchText] = React.useState("");

  const searchHandler = async (value: string) => {
    value =
      value.toLowerCase() === "active"
        ? "1"
        : value.toLowerCase() === "deactive"
        ? "0"
        : value;
    setSearchText(value ? `/search?search_customer=${value}` : "");
  };

  return (
    <MainContainer>
      <CommonToolbar title="Farmers Orders" onSearch={searchHandler} />
      <Box sx={{ mt: 3 }}>
        <FarmersOrdersListResults
          customerId={customer_id as string}
          searchText={searchText}
        />
      </Box>
    </MainContainer>
  );
}
