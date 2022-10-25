import React from "react";
import { Box } from "@mui/material";
import { MainContainer } from "../../../../components/layout";
import RetailerListResults from "../../../../components/admin/retailers/retailers-list-results";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import { useNavigate } from "react-router-dom";

export default function Retailers() {
  const [searchText, setSearchText] = React.useState("");
  const navigate = useNavigate();

  const searchHandler = (value: string) => {
    value =
      value.toLowerCase() === "active"
        ? "1"
        : value.toLowerCase() === "deactive"
        ? "0"
        : value;
    setSearchText(value ? `/search?search_retailer=${value}` : "");
  };

  return (
    <MainContainer>
      <CommonToolbar
        title="Retailer"
        onSearch={searchHandler}
        onAddProps={{
          title: "Add Retailer",
          onClick() {
            navigate("new");
          },
        }}
      />
      <Box sx={{ mt: 2 }}>
        <RetailerListResults searchText={searchText} />
      </Box>
    </MainContainer>
  );
}
