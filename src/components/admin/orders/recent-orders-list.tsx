import React from "react";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { shopOrders } from "../../../http";
import SerialNumber from "../serial-number";
import OrderStatus from "../orders/order-status";
import dayjs from "dayjs";
import DataTable from "../../table/data-table";
import { TextCenter } from "../orders/styles";
import { NumericFormat } from "react-number-format";

export default function RecentOrdersList(props: {
  params?: string;
  postfix?: string;
  variant: "retailer" | "partner";
}) {
  const { params, postfix, variant } = props;

  const { data, isLoading } = useQuery(["recent-orders"], () =>
    shopOrders("get", {
      params,
      postfix,
    })
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: (_row: any, i: number) => i + 1,
        Cell: (cell: any) => <SerialNumber cell={cell} page={0} size={"10"} />,
        width: "2%",
      },
      {
        Header: "Order ID",
        accessor: "order_id",
        Cell: (cell: any) => (
          <Typography fontWeight={"600"} textAlign="center" fontSize={"small"}>
            {cell.value}
          </Typography>
        ),
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
          <Typography textAlign={"center"} fontSize="small">
            {dayjs(cell.value).format("D-MMM-YYYY")}
          </Typography>
        ),
      },
      {
        Header: "Invoice generate date",
        accessor: (row: any) => row.order_date,
        Cell: (cell: any) => (
          <Typography textAlign={"center"} fontSize="small">
            {dayjs(cell.value).format("D-MMM-YYYY")}
          </Typography>
        ),
      },
      {
        Header: "Delivery Date",
        accessor: "delivered_date",
        Cell: (cell: any) => (
          <Typography textAlign={"center"} fontSize="small">
            {cell.value ? dayjs(cell.value).format("D-MMM-YYYY") : ""}
          </Typography>
        ),
      },
      {
        Header: "Retailer",
        accessor: "retailer_name",
        width: "15%",
        Cell: (cell: any) => (
          <TextCenter fontWeight={"600"} fontSize="small">
            {cell.row.original.retailer_company_name} ( {cell.value} )
          </TextCenter>
        ),
      },
      {
        Header: "Farmer Name",
        accessor: "customer_name",
        Cell: (cell: any) => (
          <TextCenter fontSize="small">{cell.value}</TextCenter>
        ),
      },
      {
        Header: "Delivery Address",
        accessor:
          variant === "retailer" ? "retailer_address" : "partner_address",
        Cell: (cell: any) => (
          <TextCenter fontSize="small">{cell.value}</TextCenter>
        ),
      },
      {
        Header: "Mobile No.",
        accessor:
          variant === "retailer" ? "retailer_phone_no" : "partner_phone_no",
        Cell: (cell: any) => (
          <TextCenter fontSize="small">{cell.value}</TextCenter>
        ),
      },
      {
        Header: "Total Value",
        accessor: "grand_total",
        Cell: (cell: any) => (
          <TextCenter fontWeight={"600"} fontSize="small">
            <NumericFormat value={cell.value} prefix="₹ " displayType="text" />
          </TextCenter>
        ),
      },
      {
        Header: "Agent Id",
        accessor: "agent_id",
        Cell: (cell: any) => (
          <TextCenter fontSize="small">{cell.value}</TextCenter>
        ),
      },
      {
        Header: "Agent name",
        accessor: "agent_name",
        Cell: (cell: any) => (
          <TextCenter fontSize="small">{cell.value}</TextCenter>
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
