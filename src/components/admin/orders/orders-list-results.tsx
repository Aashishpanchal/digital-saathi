import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { shopOrders } from "../../../http";
import DataTable from "../../table/data-table";
import TablePagination from "../../table/table-pagination";
import dayjs from "dayjs";
import { FaEye, FaFileInvoice } from "react-icons/fa";
import LinkRouter from "../../../routers/LinkRouter";

export default function OrdersListResults(props: {
  orderId: number;
  searchText: string;
}) {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    orders: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState("10");

  const { searchText, orderId } = props;

  const postfix = React.useMemo(() => {
    return (
      (searchText
        ? `${searchText}&page=${page}&size=${size}`
        : `?page=${page}&size=${size}`) + `&order_status=${orderId}`
    );
  }, [searchText, page, size]);

  const onGet = async () => {
    try {
      setLoading(true);
      const res = await shopOrders("get", {
        postfix: postfix,
      });
      if (res?.status === 200) {
        setData(res.data);
      }
    } catch (err: any) {
      console.log(err.response);
    }
    setLoading(false);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "order_id",
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
          <Typography fontWeight={"600"}>Rs {cell.value}</Typography>
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

  const getData = React.useMemo(() => data.orders, [data]);

  React.useEffect(() => {
    onGet();
  }, [page, size, searchText]);

  React.useEffect(() => {
    setPage(0);
  }, [searchText]);

  return (
    <DataTable
      loading={loading}
      columns={columns}
      data={getData}
      showNotFound={data.totalItems === 0}
      components={{
        pagination: (
          <TablePagination
            page={page}
            pageSize={size}
            totalItems={data.totalItems}
            count={data.totalPages}
            onChangePage={setPage}
            onPageSizeSelect={setSize}
          />
        ),
      }}
    />
  );
}
