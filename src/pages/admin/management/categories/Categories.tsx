import React from "react";
import { Box } from "@mui/material";
import { MainContainer } from "../../../../components/layout";
import CategoriesListResults from "../../../../components/admin/categories/categories-list-results";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import { MdOutlineAccountTree} from "react-icons/md";

export default function Categories() {
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const onAdd = () => setOpen(true);
  const onClose = () => setOpen(false);

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
        title={`Categories`}
        icon={<MdOutlineAccountTree />}
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
