import React from "react";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { shopOrders } from "../../../http";
import { queryToStr } from "../utils";
import SerialNumber from "../serial-number";
import OrderStatus from "../orders/order-status";
import dayjs from "dayjs";
import DataTable from "../../table/data-table";

export default function RetailerResentOrderList(props: {
  retailer_id: string;
}) {
  const { retailer_id } = props;

  const { data, isLoading } = useQuery(["resent-orders"], () =>
    shopOrders("get", {
      params: "retailer",
      postfix: "?".concat(queryToStr({ page: 0, size: 10, retailer_id })),
    })
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: (_row: any, i: number) => i + 1,
        Cell: (cell: any) => <SerialNumber cell={cell} page={0} size={"10"} />,
        width: "5%",
      },
      {
        Header: "Order ID",
        accessor: "order_id",
        width: "8%",
        Cell: (cell: any) => (
          <Typography fontWeight={"600"} textAlign="center" fontSize={"small"}>
            {cell.value}
          </Typography>
        ),
      },
      {
        Header: "Order Status",
        accessor: "order_status",
        width: "8%",
        Cell: (cell: any) => <OrderStatus value={cell.value} />,
      },
      {
        Header: "Order Date",
        accessor: "order_date",
        width: "15%",
        Cell: (cell: any) => (
          <Typography textAlign={"center"}>
            {dayjs(cell.value).format("D-MMM-YYYY")}
          </Typography>
        ),
      },
      {
        Header: "Amount",
        accessor: "grand_total",
        width: "8%",
        Cell: (cell: any) => (
          <Typography fontWeight={"600"} textAlign="center">
            ₹{cell.value}
          </Typography>
        ),
      },
      {
        Header: "Farmer Name",
        accessor: "customer_name",
      },
      {
        Header: "Retailer Name",
        accessor: "retailer_name",
        Cell: (cell: any) => (
          <Typography fontWeight={"600"} fontSize="small">
            {cell.row.original.retailer_company_name} ( {cell.value} )
          </Typography>
        ),
      },
    ],
    []
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
    />
  );
}
