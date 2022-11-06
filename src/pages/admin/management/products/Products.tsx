import React from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { MainContainer } from "../../../../components/layout";
import ProductsListResults from "../../../../components/admin/products/products-list-results";
import ProductsListToolbar from "../../../../components/admin/products/products-list-toolbar";
import { shopProducts } from "../../../../http";
import { setPageLoading } from "../../../../redux/slices/admin-slice";
import useStateWithCallback from "../../../../hooks/useStateWithCallback";
import { addSno, queryToStr } from "../../../../components/admin/utils";
import { productFields } from "../../../../constants";

export default function Products() {
  const [searchText, setSearchText] = React.useState("");
  const { state: csvData, updateState: setCsvData } = useStateWithCallback<
    Array<Record<string, any>>
  >([]);
  const ref = React.useRef<any>(null);

  const dispatch = useDispatch();

  const searchHandler = (
    value: string,
    category_id?: number,
    subcategory_id?: number
  ) => {
    if (
      typeof category_id !== "undefined" &&
      typeof subcategory_id !== "undefined"
    ) {
      setSearchText(
        "?" +
          queryToStr({
            category_id,
            subcategory_id,
            // ...(value ? { search_products: value } : {}),
          })
      );
    } else {
      setSearchText(value ? `/searchproduct?search_products=${value}` : "");
    }
    // console.log(category, subcategory);
    // setSearchText(value ? `/searchproduct?search_products=${value}` : "");
  };

  const exportHandle = async () => {
    try {
      dispatch(setPageLoading(true));
      const res = await shopProducts("get", {
        postfix: searchText,
      });
      if (res?.status === 200) {
        let csvData = res.data || [];
        // indexing
        csvData = addSno(csvData);

        setCsvData(csvData, () => {
          ref.current.link.click();
          dispatch(setPageLoading(false));
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(setPageLoading(false));
    }
  };

  return (
    <MainContainer>
      <ProductsListToolbar
        onSearch={searchHandler}
        exportProps={{
          ref,
          data: csvData,
          filename: `products-csv`,
          onClick: exportHandle,
          headers: productFields,
        }}
      />
      <Box sx={{ mt: 3 }}>
        <ProductsListResults searchText={searchText} />
      </Box>
    </MainContainer>
  );
}
