import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { shopOrders } from "../../../../http";
import TablePagination from "../../../table/table-pagination";
import RawDataNotFound from "../../raw-data-not-found";
import OrderCard from "./order-card";

function RetailerOrdersListResults(props: { orderStatus: number }) {
  const { orderStatus } = props;

  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    orders: [],
  });
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState("4");

  const onGet = async () => {
    try {
      setLoading(true);
      const res = await shopOrders("get", {
        postfix: `?order_status=${orderStatus}&page=${page}&size=${size}`,
      });
      if (res?.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const orders = React.useMemo(() => data.orders, [data]);

  React.useEffect(() => {
    onGet();
  }, [page, size, orderStatus]);

  React.useEffect(() => {
    setPage(0);
    setSize("4");
  }, [orderStatus]);

  return (
    <>
      <Box
        display={"flex"}
        justifyContent="center"
        flexDirection="column"
        gap={2}
      >
        {loading ? (
          <CircularProgress color="secondary" sx={{ alignSelf: "center" }} />
        ) : data.totalItems === 0 ? (
          <RawDataNotFound />
        ) : (
          orders.map((item, index) => <OrderCard key={index} order={item} />)
        )}
      </Box>
      <Box mt={3}>
        <TablePagination
          page={page}
          pageSize={size}
          totalItems={data.totalItems}
          count={data.totalPages}
          onChangePage={setPage}
          onPageSizeSelect={setSize}
          sizeArray={[4, 8, 12]}
        />
      </Box>
    </>
  );
}

export default React.memo(RetailerOrdersListResults);
