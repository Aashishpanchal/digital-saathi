import React from "react";
import { MainContainer } from "../../../../components/layout";
import ProductsListResults from "../../../../components/admin/products/products-list-results";
import ProductsListToolbar from "../../../../components/admin/products/products-list-toolbar";
import { Box } from "@mui/material";
import exportFromJSON from "export-from-json";
import { shopProducts } from "../../../../http";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../../../redux/slices/admin-slice";

export default function Products() {
  const [searchText, setSearchText] = React.useState("");
  const dispatch = useDispatch();

  const searchHandler = async (value: string) =>
    value ? setSearchText(`?search_products=${value}`) : setSearchText("");

  const exportHandler = async () => {
    try {
      dispatch(setPageLoading(true));
      const res = await shopProducts("get", {
        postfix: searchText,
      });
      if (res?.status === 200) {
        dispatch(setPageLoading(false));
        exportFromJSON({
          data: res.data.products,
          fileName: `products-csv`,
          exportType: "csv",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainContainer>
      <ProductsListToolbar
        onSearch={searchHandler}
        onClickExport={exportHandler}
      />
      <Box sx={{ mt: 3 }}>
        <ProductsListResults searchText={searchText} />
      </Box>
    </MainContainer>
  );
}
