import React from "react";
import { Box } from "@mui/material";
import { MainContainer } from "../../../../components/layout";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import BrandsListResults from "../../../../components/admin/brand/brands-list-results";

export default function Brands() {
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const onAdd = () => setOpen(true);
  const onClose = () => setOpen(false);

  const searchHandler = (value: string) =>
    setSearchText(value ? `/search?search_brand=${value}` : "");

  return (
    <MainContainer>
      <CommonToolbar
        onAddProps={{
          title: "Add Brand",
          onClick: onAdd,
        }}
        title="Brands"
        onSearch={searchHandler}
      />
      <Box sx={{ mt: 3 }}>
        <BrandsListResults
          searchText={searchText}
          addOpen={open}
          addClose={onClose}
        />
      </Box>
    </MainContainer>
  );
}
