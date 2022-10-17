import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { shopOrderDetails } from "../../../../http";
import TablePagination from "../../../table/table-pagination";
import OrderDetailCard from "./order-detail-card";

function OrdersDetailsList(props: { orderId: string }) {
  const { orderId } = props;

  const [orderDetails, setOrderDetails] = React.useState<any>({
    totalItems: 0,
    totalPages: 1,
    order_details: [],
  });
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);

  const onGet = async () => {
    try {
      setLoading(true);
      const res = await shopOrderDetails("get", {
        postfix: `?page=${page}&order_id=${orderId}&size=${2}`,
      });
      if (res?.status === 200) {
        setOrderDetails(res.data);
      }
    } catch (err: any) {
      console.log(err.response);
    }
    setLoading(false);
  };

  const getData = React.useMemo(
    () => orderDetails.order_details,
    [orderDetails]
  );

  React.useEffect(() => {
    onGet();
  }, [page]);

  return (
    <>
      <Typography variant="h6" my={2}>
        Orders
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          my: 2,
          flexWrap: "wrap",
          minHeight: 180,
        }}
      >
        {loading ? (
          <CircularProgress color="secondary" sx={{ alignSelf: "center" }} />
        ) : (
          getData.map((item: any, index: number) => (
            <OrderDetailCard key={index} orderDetail={item} />
          ))
        )}
      </Box>
      <TablePagination
        page={page}
        totalItems={orderDetails.totalItems}
        count={orderDetails.totalPages}
        onChangePage={setPage}
        hiddenSize
      />
    </>
  );
}

export default React.memo(OrdersDetailsList);
