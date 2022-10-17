import React from "react";
import { Box } from "@mui/material";
import { MainContainer } from "../../../../components/layout";
import RetailerListResults from "../../../../components/admin/retailers/retailers-list-results";
import RetailersToolbar from "../../../../components/admin/retailers/retailers-toolbar";

export default function Retailers() {
  const [searchText, setSearchText] = React.useState("");

  const searchHandler = (value: string) =>
    setSearchText(value ? `/search?search_retailer=${value}` : "");

  return (
    <MainContainer>
      <RetailersToolbar onSearch={searchHandler} />
      <Box sx={{ mt: 2 }}>
        <RetailerListResults searchText={searchText} />
      </Box>
    </MainContainer>
  );
}
