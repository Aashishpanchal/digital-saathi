import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  tableCellClasses,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { shopOrderDetails } from "../../../../http";
import { queryToStr } from "../../utils";
import { useTable } from "react-table";
import { styled } from "@mui/material/styles";
import { NumericFormat } from "react-number-format";

const nullFree = (value: number) => {
  if (value === undefined || value === null) return 0;
  return value;
};

const TableRowWithColSpan = (props: { title: string; value: number }) => {
  const { title, value } = props;
  return (
    <TableRow>
      <TableCell
        sx={{
          padding: 1.2,
          border: "1px solid",
        }}
      ></TableCell>
      <TableCell
        colSpan={7}
        sx={{
          padding: 1.2,
          border: "1px solid",
        }}
      >
        <b>{title}</b>
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
          padding: 1.2,
          border: "1px solid",
        }}
      >
        <TextCenter fontWeight={"bold"}>
          <NumericFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹ "}
          />
        </TextCenter>
      </TableCell>
    </TableRow>
  );
};

const TextCenter = styled(Typography)(() => ({
  textAlign: "center",
  fontSize: "small",
}));

const TableCustomCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    border: "1px solid",
    // textTransform: "capitalize",
  },
  [`&.${tableCellClasses.body}`]: {
    fontStyle: "bold",
    fontSize: 16,
  },
}));

export default function InvoiceBody(props: {
  order: Record<string, any>;
  orderId: string;
}) {
  const { order, orderId } = props;

  const { data } = useQuery(["order-details-invoice"], () =>
    shopOrderDetails("get", {
      postfix: "?".concat(
        queryToStr({
          order_id: orderId,
        })
      ),
    })
  );

  const orderDetails = React.useMemo(() => {
    if (data?.status === 200) return data.data || [];
    return [];
  }, [data]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Sr. No",
        accessor: (_row: any, i: number) => i + 1,
        Cell: (cell: any) => <TextCenter>{cell.value}</TextCenter>,
        width: "4%",
      },
      { Header: "Description", accessor: "sku_description" },
      {
        Header: "Weight",
        accessor: "weight",
        width: "5%",
        Cell: (cell: any) => <TextCenter>{cell.value}</TextCenter>,
      },
      {
        Header: "Price (Incl.GST)",
        accessor: "price",
        width: "5%",
        Cell: (cell: any) => (
          <NumericFormat
            value={cell.value}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹ "}
          />
        ),
      },
      {
        Header: "Qty",
        accessor: "quantity",
        width: "4%",
        Cell: (cell: any) => <TextCenter>{cell.value}</TextCenter>,
      },
      {
        Header: "Net Amount",
        accessor: "",
        width: "8%",
      },
      {
        Header: "Tax Type",
        accessor: "igst",
        width: "8%",
        Cell: (cell: any) => {
          const { igst, cgst, sgst } = cell.row.original;
          return (
            <TextCenter>
              {order?.retailer_state === order?.billing_state ? (
                <>
                  {`CGST (${nullFree(cgst)})`}
                  <br />
                  {`SGST (${nullFree(sgst)})`}
                </>
              ) : (
                `IGST (${nullFree(igst)})`
              )}
            </TextCenter>
          );
        },
      },
      { Header: "Tax Amount", accessor: "", width: "8%" },
      {
        Header: "Total Amount",
        accessor: "total_price",
        width: "8%",
        Cell: (cell: any) => (
          <TextCenter>
            <NumericFormat
              value={cell.value}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹ "}
            />
          </TextCenter>
        ),
      },
    ],
    []
  );

  const { headerGroups, rows, prepareRow } = useTable({
    columns,
    data: orderDetails,
  });

  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          {headerGroups.map((headerGroup, i) => (
            <TableRow
              {...headerGroup.getHeaderGroupProps()}
              key={i}
              sx={{
                "&:last-child td": { border: 0 },
              }}
            >
              {headerGroup.headers.map((column) => (
                <TableCustomCell
                  {...column.getHeaderProps()}
                  title={column.render("Header") as string}
                  sx={{
                    padding: 1.2,
                    width: column.render("width") as string | number,
                  }}
                  align="center"
                >
                  {column.render("Header")}
                </TableCustomCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} hover>
                {row.cells.map((cell) => {
                  let props = cell.getCellProps();
                  return (
                    <TableCell
                      {...props}
                      sx={{
                        padding: 1.2,
                        border: "1px solid",
                      }}
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          <TableRowWithColSpan title="Total" value={order?.grand_total || 0} />
          <TableRowWithColSpan
            title="Delivery Charges"
            value={order?.delivery_charge || 0}
          />
          <TableRowWithColSpan
            title="Discount"
            value={order?.delivery_discount || 0}
          />
          <TableRowWithColSpan
            title="Amount Payable"
            value={order?.grand_total || 0}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
