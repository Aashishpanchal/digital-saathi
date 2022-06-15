import React from "react";
import { Table } from "flowbite-react";
import * as Filter from "../filter";
import Pagination from "./Pagination";
import TableContainer from "../common/MainContainer";
import header from "./header";

export default function RecentlyOrdersTable() {
  const [page, setPage] = React.useState(1);
  const Head = header([
    "S No.",
    "Order ID",
    "Order Date",
    "Order Status",
    "Amount",
    "Farmer Name",
    "Retailer Name",
    "Action",
  ]);
  return (
    <TableContainer heading="Recently Orders">
      <Filter.FilterContainer>
        <Filter.FilterForm>
          <h1>I am Aashish</h1>
        </Filter.FilterForm>
        <Filter.FilterAction />
      </Filter.FilterContainer>
      <Table>
        <Head />
        <Table.Body></Table.Body>
      </Table>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        size={1}
        showPageSet
      />
    </TableContainer>
  );
}
