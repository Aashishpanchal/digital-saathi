// subcategories
import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MainContainer } from "../../../../components/layout";
import { categories } from "../../../../http";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import SubCategoriesList from "../../../../components/admin/categories/sub-categories-list";

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
        <SubCategoriesList
          searchText={searchText}
          addOpen={open}
          addClose={onClose}
          categoryId={parent_category_id as string}
          sortOpen={sortOpen}
          onSortClose={onSortClose}
        />
      </Box>
    </MainContainer>
  );
}
