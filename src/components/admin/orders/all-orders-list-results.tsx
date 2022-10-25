import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { shopOrders } from "../../../http";
import DataTable from "../../table/data-table";
import TablePagination from "../../table/table-pagination";
import dayjs from "dayjs";
import { FaEye, FaFileInvoice } from "react-icons/fa";
import LinkRouter from "../../../routers/LinkRouter";
import OrderStatus from "./order-status";
import { useQuery } from "@tanstack/react-query";
import usePaginate from "../../../hooks/usePaginate";

export default function AllOrdersListResults(props: { searchText: string }) {
  // const [page, setPage] = React.useState(0);
  const { page, setPage, size, setSize } = usePaginate();
  // const [size, setSize] = React.useState("10");

  const { searchText } = props;

  const postfix = React.useMemo(() => {
    return searchText
      ? `${searchText}&page=${page}&size=${size}`
      : `?page=${page}&size=${size}`;
  }, [searchText, page, size]);

  const { isLoading, data } = useQuery(
    ["all-order", postfix],
    () =>
      shopOrders("get", {
        postfix,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "order_id",
      },
      {
        Header: "Order Status",
        accessor: "order_status",
        Cell: (cell: any) => <OrderStatus value={cell.value} />,
      },
      {
        Header: "Order Date",
        accessor: "order_date",
        Cell: (cell: any) => (
          <Typography>{dayjs(cell.value).format("MMMM D, YYYY")}</Typography>
        ),
      },
      {
        Header: "Amount",
        accessor: "grand_total",
        Cell: (cell: any) => (
          <Typography fontWeight={"600"}>₹{cell.value}</Typography>
        ),
      },
      {
        Header: "Farmer Name",
        accessor: "customer_name",
      },
      {
        Header: "Retailer Name",
        accessor: "retailer_name",
      },
      {
        Header: "Action",
        Cell: (cell: any) => (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LinkRouter
              to={`/orders/order-details/${cell.row.original.order_id}`}
            >
              <Tooltip title="View Orders">
                <IconButton
                  disableRipple={false}
                  size="small"
                  color="secondary"
                >
                  <FaEye />
                </IconButton>
              </Tooltip>
            </LinkRouter>
            <LinkRouter
              to={`/orders/order-invoice-print/${cell.row.original.order_id}`}
            >
              <Tooltip title="Order Invoice">
                <IconButton
                  disableRipple={false}
                  size="small"
                  color="secondary"
                >
                  <FaFileInvoice />
                </IconButton>
              </Tooltip>
            </LinkRouter>
          </Box>
        ),
      },
    ],
    [page, size]
  );

  const getData = React.useMemo(() => {
    if (data?.status === 200) {
      return data.data;
    } else
      return {
        totalItems: 0,
        totalPages: 1,
        orders: [],
      };
  }, [data]);

  return (
    <DataTable
      loading={isLoading}
      columns={columns}
      data={getData.orders}
      showNotFound={getData.totalItems === 0}
      components={{
        pagination: (
          <TablePagination
            page={page}
            pageSize={size}
            totalItems={getData.totalItems}
            count={getData.totalPages}
            onChangePage={setPage}
            onPageSizeSelect={setSize}
          />
        ),
      }}
    />
  );
}
