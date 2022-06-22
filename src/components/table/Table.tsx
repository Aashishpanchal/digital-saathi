import React from "react";
import { useTable, useGlobalFilter, useFilters, useSortBy } from "react-table";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import * as Filter from "../filter";
import GlobalFilterInput from "../filter/GlobalFilterInput";
import { Label } from "flowbite-react";
import Pagination from "./Pagination";

export default function Table(props: {
  columns: any;
  data: Array<{ [key: string]: any }>;
  showPagination?: boolean;
  page?: number;
  changePage?: (page: number) => void;
  totalPages?: number;
  totalEntries?: number;
  entriesPerPage?: number;
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    ...others
  } = useTable(
    {
      columns: props.columns,
      data: props.data,
    },
    useGlobalFilter,
    useFilters,
    useSortBy
  );

  return (
    <div className="text-gray-500">
      <Filter.FilterContainer>
        <Filter.FilterForm>
          <GlobalFilterInput {...(others as any)} />
          {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column) => {
              return (column as any).Filter ? (
                <div key={column.id}>
                  <Label htmlFor={column.id}>{column.render("Header")}: </Label>
                  {column.render("Filter")}
                </div>
              ) : null;
            })
          )}
        </Filter.FilterForm>
      </Filter.FilterContainer>
      <div className="shadow-md rounded-lg overflow-hidden">
        <div
          className="block overflow-y-auto overflow-x-auto"
          style={{ maxHeight: "35rem" }}
        >
          <table
            className="border-collapse min-w-full leading-normal"
            {...getTableProps()}
            border={1}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => {
                    // const canSort = (column as any).canSort;
                    let props = {
                      ...column.getHeaderProps(
                        (column as any).getSortByToggleProps()
                      ),
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
                          "text-left whitespace-nowrap align-middle px-5 py-3 border-b-2 border-gray-200 bg-blue-light  text-xs font-semibold text-white uppercase tracking-wider"
                        }
                        {...props}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <span>{column.render("Header")}</span>
                          {/* Add a sort direction indicator */}
                          <span>
                            {(column as any).isSorted ? (
                              (column as any).isSortedDesc ? (
                                <AiFillCaretDown className="w-4 h-4 text-white" />
                              ) : (
                                <AiFillCaretUp className="w-4 h-4 text-white" />
                              )
                            ) : (
                              <AiFillCaretUp className="w-4 h-4 text-white opacity-0 group-hover:opacity-100" />
                            )}
                          </span>
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
                    {row.cells.map((cell) => {
                      let props = cell.getCellProps();
                      let align = "left";
                      try {
                        align = (cell.column as any).extraProps.align;
                      } catch (error: any) {}
                      return (
                        <td
                          className="whitespace-nowrap px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm"
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
            </tbody>
          </table>
        </div>
        {props.showPagination && (
          <div className="px-2 py-2">
            <Pagination
              page={props.page}
              changePage={props.changePage}
              totalEntries={props.totalEntries}
              totalPages={props.totalPages}
              entriesPerPage={props.entriesPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
