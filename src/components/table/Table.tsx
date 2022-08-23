import React from "react";
import { useTable, useGlobalFilter, useFilters, useSortBy } from "react-table";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import * as Filter from "../filter";
import GlobalFilterInput from "../filter/GlobalFilterInput";
import { Alert, Label, Spinner } from "flowbite-react";
import Pagination from "./Pagination";
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setTableAlert } from "../../redux/slices/alertSlice";
import Button from "../button/Button";
import { FaFileUpload } from "react-icons/fa";
import DownloadRows from "../csv/button/DownloadRows";

export default function Table(props: {
  columns: any;
  data: Array<{ [key: string]: any }>;
  showPagination?: boolean;
  page?: number;
  changePage?: (page: number) => void;
  totalPages?: number;
  totalEntries?: number;
  entriesPerPage?: number;
  onUpload?: (data: any) => Promise<void>;
  exportFileName?: string;
  showExport?: boolean;
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

  const { tableAlert } = useSelector((state: RootState) => state.alertSlice);

  const dispatch = useDispatch();
  const onDismiss = () => {
    dispatch(setTableAlert({ ...tableAlert, show: false }));
  };
  const [uploadingLoading, setUploadingLoading] = React.useState(false);

  React.useEffect(() => {
    return () => {
      onDismiss();
    };
  }, []);

  return (
    <div className="text-gray-500">
      <div className="my-2">
        {props.showExport && (
          <DownloadRows
            fileName={props.exportFileName}
            title="Export"
            rows={rows}
          />
        )}
        {tableAlert.show && (
          <Alert
            color={tableAlert.type as any}
            icon={HiInformationCircle}
            onDismiss={onDismiss}
          >
            <span>
              <span className="font-medium">{tableAlert.highLight}</span>
              {tableAlert.text}
            </span>
          </Alert>
        )}
      </div>
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
                  <tr {...row.getRowProps()} key={i.toString()}>
                    {row.cells.map((cell) => {
                      let props = cell.getCellProps();
                      let align = "left";
                      try {
                        align = (cell.column as any).extraProps.align || "left";
                      } catch (error: any) {}
                      return (
                        <td
                          className="whitespace-nowrap px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm "
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
      {props.onUpload && (
        <div className="mt-4">
          <Button
            type={"button"}
            color="dark"
            onClick={async () => {
              if (props.onUpload) {
                setUploadingLoading(true);
                await props.onUpload(rows);
                setUploadingLoading(false);
              }
            }}
            icon={
              uploadingLoading ? (
                <Spinner size="md" />
              ) : (
                <FaFileUpload size={20} />
              )
            }
          >
            Upload Now
          </Button>
        </div>
      )}
    </div>
  );
}
