import React from "react";
import { useTable } from "react-table";
import { NumberToString } from "../../Utils";

export default function OrderDetailTable(props: {
  columns: any;
  data: Array<{ [key: string]: any }>;
  orderData: { [key: string]: any };
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: props.columns,
      data: props.data,
    });

  const OrdersTr = (props: { description: string; amount: string }) => {
    return (
      <tr>
        <td className="border border-black"></td>
        <td className="font-bold p-3 border border-black">
          {props.description}
        </td>
        <td className="border border-black"></td>
        <td className="border border-black"></td>
        <td className="border border-black"></td>
        <td className="border border-black"></td>
        <td className="border border-black"></td>
        <td className="font-bold p-3 border border-black" align="center">
          {props.amount}
        </td>
      </tr>
    );
  };

  return (
    <tr className="flex flex-col border-2 border-black text-xs">
      <td>
        <table
          className="border-collapse border-black min-w-full leading-normal"
          {...getTableProps()}
          border={1}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => {
                  // const canSort = (column as any).canSort;
                  let props = {
                    ...column.getHeaderProps(),
                  };
                  try {
                    props = {
                      ...props,
                      style: {
                        ...props.style,
                        ...(column as any).extraProps.columnStyle,
                      },
                    };
                  } catch (error: any) {}
                  return (
                    <th
                      className={
                        "text-left whitespace-nowrap p-2 border border-black text-xs font-bold text-black first-letter:uppercase tracking-wider"
                      }
                      {...props}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>{column.render("Header")}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, j) => {
                    let props = cell.getCellProps();
                    let align = "left";
                    try {
                      align = (cell.column as any).extraProps.align;
                    } catch (error: any) {}
                    return (
                      <td
                        className="whitespace-nowrap p-3 text-sm border border-black"
                        {...props}
                        align={align as any}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <OrdersTr
              description="Total"
              amount={props.orderData?.grand_total}
            />
            <OrdersTr
              description="Delivery charges"
              amount={props.orderData?.delivery_charge || "0"}
            />
            <OrdersTr
              description="Delivery Discount"
              amount={props.orderData?.delivery_discount || "0"}
            />
            <OrdersTr
              description="Amount Payable"
              amount={props.orderData?.grand_total || "0"}
            />
          </tbody>
        </table>
        {/* Order Fifth */}
      </td>
      <td className="py-2 px-1">
        <span className="font-bold">
          Amount in Words- {NumberToString(props.orderData?.grand_total || "0")}
        </span>
      </td>
    </tr>
  );
}
