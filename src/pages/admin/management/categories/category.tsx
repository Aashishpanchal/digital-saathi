import React from "react";
import { Box } from "@mui/material";
import { MainContainer } from "../../../../components/layout";
import CategoriesListResults from "../../../../components/admin/categories/categories-list-results";
import CommonToolbar from "../../../../components/admin/common-toolbar";

export default function Categories() {
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [sortOpen, setSortOpen] = React.useState(false);

  const onAdd = () => setOpen(true);
  const onClose = () => setOpen(false);

  const onSortOpen = () => setSortOpen(true);
  const onSortClose = () => setSortOpen(false);

  const searchHandler = (value: string) => {
    setSearchText(value ? `/search?search_category=${value}` : "");
  };

  return (
    <MainContainer>
      <CommonToolbar
        onAddProps={{
          title: "Add Category",
          onClick: onAdd,
        }}
        onClickSort={onSortOpen}
        title={`Categories`}
        onSearch={searchHandler}
      />
      <Box sx={{ mt: 3 }}>
        <CategoriesListResults
          searchText={searchText}
          addOpen={open}
          addClose={onClose}
          sortOpen={sortOpen}
          onSortClose={onSortClose}
        />
      </Box>
    </MainContainer>
  );
}
