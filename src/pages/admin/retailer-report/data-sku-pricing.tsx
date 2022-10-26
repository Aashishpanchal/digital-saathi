import React from "react";
import { MainContainer } from "../../../components/layout";
import exportFromJSON from "export-from-json";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { shopOrders } from "../../../http";
import { setPageLoading } from "../../../redux/slices/admin-slice";
import CommonToolbar from "../../../components/admin/common-toolbar";
import DataSkuPricingList from "../../../components/admin/retailer-report/data-sku-pricing-list";

export default function DataSkuPricing() {
  const [searchText, setSearchText] = React.useState("");

  const searchHandler = async (value: string) => {
    value =
      value.toLowerCase() === "active"
        ? "1"
        : value.toLowerCase() === "deactive"
        ? "0"
        : value;
    setSearchText(value ? `/search?search_product=${value}` : "");
  };

  const dispatch = useDispatch();

  const exportHandler = async () => {
    try {
      dispatch(setPageLoading(true));
      const res = await shopOrders("get", {
        params: "csv",
        postfix: searchText,
      });
      if (res?.status === 200) {
        dispatch(setPageLoading(false));
        exportFromJSON({
          data: res.data.orders,
          fileName: `data-sku-pricing-csv`,
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
        title="Data SKU Pricing"
        onSearch={searchHandler}
        onClickExport={exportHandler}
      />
      <Box sx={{ mt: 3 }}>
        <DataSkuPricingList searchText={searchText} />
      </Box>
    </MainContainer>
  );
}
