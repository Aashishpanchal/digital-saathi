import React from "react";
import { Box } from "@mui/material";
import { MainContainer } from "../../../../components/layout";
import CategoryToolbar from "../../../../components/admin/categories/category-toolbar";
import CategoriesListResults from "../../../../components/admin/categories/categories-list-results";

export default function Categories() {
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const onAdd = () => setOpen(true);
  const onClose = () => setOpen(false);

  const searchHandler = (value: string) => {
    value =
      value.toLowerCase() === "active"
        ? "1"
        : value.toLowerCase() === "deactive"
        ? "0"
        : value;
    setSearchText(value ? `/search?search_category=${value}` : "");
  };

  return (
    <MainContainer>
      <CategoryToolbar
        onAdd={onAdd}
        title="Categories"
        onSearch={searchHandler}
      />
      <Box sx={{ mt: 3 }}>
        <CategoriesListResults
          searchText={searchText}
          addOpen={open}
          addClose={onClose}
        />
      </Box>
    </MainContainer>
  );
}
