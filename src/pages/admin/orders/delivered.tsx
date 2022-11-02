import React from "react";
import { MainContainer } from "../../../components/layout";
import exportFromJSON from "export-from-json";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import OrdersListResults from "../../../components/admin/orders/orders-list-results";
import OrdersToolbar, {
  type DatesType,
} from "../../../components/admin/orders/orders-toolbar";
import { shopOrders } from "../../../http";
import { setPageLoading } from "../../../redux/slices/admin-slice";
import { queryToStr } from "../../../components/admin/utils";

const orderId = 5;

export default function Delivered() {
  const [searchText, setSearchText] = React.useState("");

  const searchHandler = (value: string, dates: DatesType) => {
    if (dates.from && dates.to) {
      setSearchText(
        "?" +
          queryToStr({
            date_from: dates.from.format("YYYY-MM-DD"),
            date_to: dates.to.format("YYYY-MM-DD"),
            ...(value ? { search_orders: value } : {}),
          })
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
        postfix: searchText
          ? `${searchText}&order_status=${orderId}`
          : `?order_status=${orderId}`,
        params: "csv",
      });
      if (res?.status === 200) {
        let csvData = res.data.orders;
        csvData = csvData.map((row: Record<string, any>, index: number) => ({
          ...row,
          s_no: index + 1,
        }));
        csvData = csvData.map((row: Record<string, any>) => ({
          ...row,
          order_status2:
            row.order_status === 0
              ? "New"
              : row.order_status === 1
              ? "Accepted"
              : row.order_status === 3
              ? "Picked-up "
              : row.order_status === 5
              ? "Delivered"
              : row.order_status === 7
              ? "Reject By Farmer"
              : row.order_status === 9
              ? "Rejected"
              : null,
        }));
        dispatch(setPageLoading(false));
        exportFromJSON({
          data: csvData,
          fileName: `delivered-orders-csv`,
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
        Delivered-Orders
      </OrdersToolbar>
      <Box sx={{ mt: 3 }}>
        <OrdersListResults searchText={searchText} orderStatus={orderId} />
      </Box>
    </MainContainer>
  );
}
