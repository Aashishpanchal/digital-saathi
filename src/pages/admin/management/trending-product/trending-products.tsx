import React from "react";
import Box from "@mui/material/Box";
import TrendingProductList from "../../../../components/admin/products/trending-product/trending-products-list";
import ProductsListToolbar from "../../../../components/admin/products/products-list-toolbar";
import { MainContainer } from "../../../../components/layout";
import { queryToStr } from "../../../../components/admin/utils";

export default function TrendingProducts() {
  const [searchText, setSearchText] = React.useState("");

  const searchHandler = (
    value: string,
    category_id?: number,
    subcategory_id?: number
  ) => {
    setSearchText(
      "?" +
        queryToStr({
          category_id: typeof category_id !== "undefined" ? category_id : 0,
          subcategory_id:
            typeof subcategory_id !== "undefined" ? subcategory_id : 0,
          ...(value ? { search_products: value } : {}),
        })
    );
    // setSearchText(value ? `/searchproduct?search_products=${value}` : "");
  };

  return (
    <MainContainer>
      <ProductsListToolbar title="Trending Products" onSearch={searchHandler} />
      <Box sx={{ mt: 2 }}>
        <TrendingProductList searchText={searchText} />
      </Box>
    </MainContainer>
  );
}
