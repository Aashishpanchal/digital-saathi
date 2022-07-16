import React from "react";
import { useTable } from "react-table";

export default function OrderDetailTable(props: {
  columns: any;
  data: Array<{ [key: string]: any }>;
  children?: React.ReactNode;
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: props.columns,
      data: props.data,
    });
  return (
    <tr className="w-full grid border-2 border-black text-xs">
      <td>
        <table
          className="border-collapse min-w-full leading-normal table-auto"
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
                        (headerGroup.headers.length - 1 !== index
                          ? "border-r "
                          : " ") +
                        "text-left whitespace-nowrap p-2 border-b-2 border-black text-xs font-bold text-black first-letter:uppercase tracking-wider"
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
                        className={"whitespace-nowrap p-3 text-sm"}
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
            {props.children}
          </tbody>
        </table>
      </td>
    </tr>
  );
}
