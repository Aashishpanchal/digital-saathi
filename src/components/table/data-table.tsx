import React from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  Column,
} from "react-table";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  tableCellClasses,
  Box,
  TableBody,
  TableContainer,
  Card,
  CircularProgress,
} from "@mui/material";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { styled } from "@mui/material";
import RowSearch from "./row-search";
import RawDataNotFound from "../admin/raw-data-not-found";

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#12a87f",
    color: theme.palette.common.white,
    borderRight: "1px solid white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export interface DataTableProps {
  columns: readonly Column<{ [key: string]: any }>[];
  data: Array<{ [key: string]: any }>;
  filtersHidden?: boolean;
  loading?: boolean;
  components?: {
    pagination?: React.ReactNode;
  };
  showNotFound?: boolean;
}

export default function DataTable(props: DataTableProps) {
  const { columns, data, components, loading, filtersHidden, showNotFound } =
    props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    ...others
  } = useTable(
    {
      columns: columns,
      data: data,
    },
    useGlobalFilter,
    useFilters,
    useSortBy
  );

  return (
    <Card sx={{ paddingBottom: 2 }}>
      {filtersHidden && <RowSearch {...(others as any)} />}
      <Box
        sx={{
          marginBottom: 2,
        }}
      >
        <TableContainer
          sx={{
            minWidth: 800,
            maxHeight: 800,
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{
              minWidth: "max-content",
            }}
          >
            <TableHead>
              {headerGroups.map((headerGroup, i) => (
                <TableRow
                  {...headerGroup.getHeaderGroupProps()}
                  key={i}
                  sx={{
                    "&:last-child td": { border: 0 },
                  }}
                >
                  {headerGroup.headers.map((column) => {
                    let props = {
                      ...column.getHeaderProps(
                        (column as any).getSortByToggleProps()
                      ),
                    };
                    return (
                      <TableHeaderCell
                        {...props}
                        title={column.render("Header") as string}
                        sx={{
                          padding: 1.2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 0.2,
                          }}
                        >
                          {column.render("Header")}
                          {(column as any).isSorted ? (
                            (column as any).isSortedDesc ? (
                              <AiFillCaretDown />
                            ) : (
                              <AiFillCaretUp />
                            )
                          ) : (
                            <Box sx={{ opacity: 0 }} component={"span"}>
                              <AiFillCaretUp />
                            </Box>
                          )}
                        </Box>
                      </TableHeaderCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={columns.length}
                    sx={{ py: 3 }}
                  >
                    <CircularProgress color="secondary" />
                  </TableCell>
                </TableRow>
              ) : showNotFound ? (
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={columns.length}
                    sx={{ py: 3 }}
                  >
                    <RawDataNotFound />
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => {
                  prepareRow(row);
                  return (
                    <TableRow
                      {...row.getRowProps()}
                      hover
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {row.cells.map((cell) => {
                        let props = cell.getCellProps();
                        return (
                          <TableCell
                            {...props}
                            sx={{
                              borderBottom: "1px solid",
                              borderColor: "neutral.300",
                            }}
                          >
                            {cell.render("Cell")}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {components?.pagination}
    </Card>
  );
}
