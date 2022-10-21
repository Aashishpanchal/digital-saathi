// subcategories
import React from "react";
import { Box } from "@mui/material";
import { MainContainer } from "../../../../components/layout";
import CategoryToolbar from "../../../../components/admin/categories/category-toolbar";
import CategoriesListResults from "../../../../components/admin/categories/categories-list-results";
import { categories } from "../../../../http";
import { useParams } from "react-router-dom";

export default function SubCategories() {
  const { parent_category_id } = useParams();
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState("");

  const onAdd = () => setOpen(true);
  const onClose = () => setOpen(false);

  const searchHandler = (value: string) =>
    setSearchText(value ? `/search?search_subcategory=${value}` : "");

  const getName = async () => {
    try {
      const res = await categories("get", { params: parent_category_id });
      if (res?.status === 200) {
        setCategoryName(res.data?.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getName();
  }, []);

  return (
    <MainContainer>
      <CategoryToolbar
        onAdd={onAdd}
        title={`Sub-Categories of ${categoryName}`}
        onSearch={searchHandler}
      />
      <Box sx={{ mt: 3 }}>
        <CategoriesListResults
          searchText={searchText}
          addOpen={open}
          addClose={onClose}
          categoryPartnerId={parent_category_id}
        />
      </Box>
    </MainContainer>
  );
}
