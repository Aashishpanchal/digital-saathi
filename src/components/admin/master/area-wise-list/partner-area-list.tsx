import React from "react";
import { useQuery } from "@tanstack/react-query";
import { queryToStr } from "../../utils";
import { shopPartnerArea } from "../../../../http";
import SerialNumber from "../../serial-number";
import DataTable from "../../../table/data-table";
import usePaginate from "../../../../hooks/usePaginate";
import TablePagination from "../../../table/table-pagination";
import FocusStar from "../../focus-star";

export default function PartnerAreaList(props: {
  searchText: string;
  area_id: string;
}) {
  const { page, setPage, size, setSize } = usePaginate();
  const { searchText, area_id } = props;

  const postfix = React.useMemo(() => {
    const x = queryToStr({
      page,
      size,
      area_id,
    });
    return searchText ? `${searchText}&${x}` : `?${x}`;
  }, [searchText, page, size]);

  const { isLoading, refetch, data } = useQuery(
    ["partner-Areas", postfix],
    () =>
      shopPartnerArea("get", {
        postfix,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: (_row: any, i: number) => i + 1,
        Cell: (cell: any) => (
          <SerialNumber cell={cell} page={page} size={size} />
        ),
        width: "5.5%",
      },
      { Header: "Area", accessor: "area" },
      { Header: "Pincode", accessor: "pincode" },
      { Header: "Partner Name", accessor: "partner_name" },
      { Header: "Zone Name", accessor: "zone_name" },
      {
        Header: "Focus Partner",
        accessor: "focus_partner",
        Cell: (cell: any) => (
          <FocusStar
            cell={cell}
            idAccessor="partner_area_id"
            payload={["area_id"]}
            dataKeySet="focus_partner"
            refetch={refetch}
            axiosFunction={shopPartnerArea}
          />
        ),
      },
    ],
    [page, size]
  );

  const getData = React.useMemo(() => {
    if (data?.status === 200) return data.data;
    return { totalItems: 0, totalPages: 1, areas: [] };
  }, [data]);

  React.useEffect(() => {
    if (searchText) setPage(0);
  }, [searchText]);

  return (
    <DataTable
      loading={isLoading}
      columns={columns}
      data={getData.areas}
      showNotFound={getData.totalItems === 0}
      components={{
        pagination: (
          <TablePagination
            page={page}
            pageSize={size}
            totalItems={getData.totalItems}
            count={getData.totalPages}
            onChangePage={setPage}
            onPageSizeSelect={setSize}
          />
        ),
      }}
    />
  );
}
