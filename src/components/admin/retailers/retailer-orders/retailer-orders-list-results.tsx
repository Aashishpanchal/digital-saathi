import React from "react";
import { shopOrders } from "../../../../http";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress } from "@mui/material";
import { queryToStr } from "../../utils";
import OrderCard from "./order-card";
import RawDataNotFound from "../../raw-data-not-found";
import TablePagination from "../../../table/table-pagination";

function RetailerOrdersListResults(props: { orderStatus: number }) {
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState("4");

  const { orderStatus } = props;
  const postfix = React.useMemo(
    () => "?" + queryToStr({ page, size, order_status: orderStatus }),
    [page, size, orderStatus]
  );

  const { isLoading, data } = useQuery(
    [`retailer-orders`, postfix],
    () =>
      shopOrders("get", {
        postfix,
      }),
    {
      keepPreviousData: true,
    }
  );

  const getData = React.useMemo(() => {
    if (data?.status === 200) return data.data;
    return {
      totalItems: 0,
      totalPages: 1,
      orders: [],
    };
  }, [data]);

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
        {isLoading ? (
          <CircularProgress color="secondary" sx={{ alignSelf: "center" }} />
        ) : getData.totalItems === 0 ? (
          <RawDataNotFound />
        ) : (
          getData.orders.map(
            (
              item: { [key: string]: any } | undefined,
              index: React.Key | null | undefined
            ) => <OrderCard key={index} order={item} />
          )
        )}
      </Box>
      <Box mt={3}>
        <TablePagination
          page={page}
          pageSize={size}
          totalItems={getData.totalItems}
          count={getData.totalPages}
          onChangePage={setPage}
          onPageSizeSelect={setSize}
          sizeArray={[4, 8, 12]}
        />
      </Box>
    </>
  );
}

export default React.memo(RetailerOrdersListResults);
