import React from "react";
import { MainContainer } from "../../../components/layout";
import exportFromJSON from "export-from-json";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import OrdersToolbar, {
  type DatesType,
} from "../../../components/admin/orders/orders-toolbar";
import { shopOrders } from "../../../http";
import { setPageLoading } from "../../../redux/slices/admin-slice";
import AllOrdersListResults from "../../../components/admin/orders/all-orders-list-results";

export default function AllOrders() {
  const [searchText, setSearchText] = React.useState("");

  const searchHandler = (value: string, dates: DatesType) => {
    if (dates.from && dates.to) {
      setSearchText(
        `?date_from=${dates.from.format(
          "YYYY-MM-DD"
        )}&date_to=${dates.to.format("YYYY-MM-DD")}${
          value ? `&search_orders=${value}` : ""
        }`
      );
    } else {
      setSearchText(value ? `?search_orders=${value}` : "");
    }
  };

  const dispatch = useDispatch();

  const exportHandler = async () => {
    try {
      dispatch(setPageLoading(true));
      const res = await shopOrders("get", {
        postfix: searchText ? `${searchText}` : ``,
      });
      if (res?.status === 200) {
        dispatch(setPageLoading(false));
        exportFromJSON({
          data: res.data.orders,
          fileName: `new-orders-csv`,
          exportType: "csv",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainContainer>
      <OrdersToolbar onSearch={searchHandler} onClickExport={exportHandler}>
        All Orders
      </OrdersToolbar>
      <Box sx={{ mt: 3 }}>
        <AllOrdersListResults searchText={searchText} />
      </Box>
    </MainContainer>
  );
}
