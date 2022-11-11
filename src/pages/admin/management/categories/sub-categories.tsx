// subcategories
import React from "react";
import { Box } from "@mui/material";
import { MainContainer } from "../../../../components/layout";
import CategoriesListResults from "../../../../components/admin/categories/categories-list-results";
import { categories, subCategories } from "../../../../http";
import { useParams } from "react-router-dom";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import { useQuery } from "@tanstack/react-query";
import SortMainDialog from "../../../../components/admin/sort-main-dialog";
import { queryToStr } from "../../../../components/admin/utils";

export default function SubCategories() {
  const { parent_category_id } = useParams();
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [sortOpen, setSortOpen] = React.useState(false);

  const onAdd = () => setOpen(true);
  const onClose = () => setOpen(false);

  const onSortOpen = () => setSortOpen(true);
  const onSortClose = () => setSortOpen(false);

  const searchHandler = (value: string) =>
    setSearchText(value ? `/search?search_category=${value}` : "");

  const { data } = useQuery(["category-name"], () =>
    categories("get", { params: parent_category_id })
  );

  const categoryName = React.useMemo(() => {
    if (data?.status) return data.data?.name;
    return "";
  }, [data]);

  return (
    <MainContainer>
      <CommonToolbar
        onAddProps={{
          title: "Add Sub Category",
          onClick: onAdd,
        }}
        title={`${categoryName} / Sub-Categories`}
        onSearch={searchHandler}
        onClickSort={onSortOpen}
      />
      <Box sx={{ mt: 3 }}>
        <CategoriesListResults
          searchText={searchText}
          addOpen={open}
          addClose={onClose}
          categoryPartnerId={parent_category_id}
        />
      </Box>
      {sortOpen && (
        <SortMainDialog
          id="select-subcategories"
          title="Sort SubCategories"
          dataKeyExtract="subcategories"
          open={sortOpen}
          onClose={onSortClose}
          extractObj={{
            value: "name",
            id: "category_id",
          }}
          postfix={"?".concat(queryToStr({ category_id: parent_category_id }))}
          requestFunc={subCategories}
        />
      )}
    </MainContainer>
  );
}
