import React from "react";
import { MainContainer } from "../../../components/layout";
import exportFromJSON from "export-from-json";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { shopProducts } from "../../../http";
import { setPageLoading } from "../../../redux/slices/admin-slice";
import CommonToolbar from "../../../components/admin/common-toolbar";
import DataSkuUnitList from "../../../components/admin/retailer-report/data-sku-unit-list";

export default function DataSkuUnit() {
  const [searchText, setSearchText] = React.useState("");

  const searchHandler = async (value: string) => {
    value =
      value.toLowerCase() === "active"
        ? "1"
        : value.toLowerCase() === "deactive"
        ? "0"
        : value;
    setSearchText(value ? `/searchproduct?search_products=${value}` : "");
  };

  const dispatch = useDispatch();

  const exportHandler = async () => {
    try {
      dispatch(setPageLoading(true));
      const res = await shopProducts("get", {
        postfix: searchText,
      });
      if (res?.status === 200) {
        dispatch(setPageLoading(false));
        exportFromJSON({
          data: searchText ? res.data || [] : res.data.product,
          fileName: `data-sku-unit-csv`,
          exportType: "csv",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainContainer>
      <CommonToolbar
        title="Data SKU Unit"
        onSearch={searchHandler}
        onClickExport={exportHandler}
      />
      <Box sx={{ mt: 3 }}>
        <DataSkuUnitList searchText={searchText} />
      </Box>
    </MainContainer>
  );
}
