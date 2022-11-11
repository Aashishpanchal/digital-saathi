import React from "react";
import { Box } from "@mui/material";
import { MainContainer } from "../../../../components/layout";
import CategoriesListResults from "../../../../components/admin/categories/categories-list-results";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import { categories } from "../../../../http";
import SortMainDialog from "../../../../components/admin/sort-main-dialog";

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
        />
      </Box>
      {sortOpen && (
        <SortMainDialog
          id="select-category"
          title="Sort Categories"
          dataKeyExtract="categories"
          open={sortOpen}
          onClose={onSortClose}
          extractObj={{
            value: "name",
            id: "category_id",
          }}
          requestFunc={categories}
        />
      )}
    </MainContainer>
  );
}
