import React from "react";
import exportFromJSON from "export-from-json";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { MainContainer } from "../../../../components/layout";
import ProductsListResults from "../../../../components/admin/products/products-list-results";
import ProductsListToolbar from "../../../../components/admin/products/products-list-toolbar";
import { shopProducts } from "../../../../http";
import { setPageLoading } from "../../../../redux/slices/admin-slice";

export default function Products() {
  const [searchText, setSearchText] = React.useState("");
  const dispatch = useDispatch();

  const searchHandler = (value: string) => {
    setSearchText(value ? `/searchproduct?search_products=${value}` : "");
  };

  const exportHandler = async () => {
    try {
      dispatch(setPageLoading(true));
      const res = await shopProducts("get", {
        postfix: searchText,
      });
      if (res?.status === 200) {
        dispatch(setPageLoading(false));
        exportFromJSON({
          data: res.data.product,
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
