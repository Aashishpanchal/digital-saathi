import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "../../../../components/layout";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import DeliveryPartnerList from "../../../../components/admin/delivery-partner/delivery-partner-list";

export default function DeliveryPartner() {
  const [searchText, setSearchText] = React.useState("");
  const navigate = useNavigate();

  const searchHandler = (value: string) => {
    value =
      value.toLowerCase() === "active"
        ? "1"
        : value.toLowerCase() === "deactive"
        ? "0"
        : value;
    setSearchText(value ? `/search?search_partner=${value}` : "");
  };

  return (
    <MainContainer>
      <CommonToolbar
        title="Delivery Partner"
        onSearch={searchHandler}
        onAddProps={{
          title: "Add Delivery Partner",
          onClick() {
            navigate("new");
          },
        }}
      />
      <Box sx={{ mt: 2 }}>
        <DeliveryPartnerList searchText={searchText} />
      </Box>
    </MainContainer>
  );
}
