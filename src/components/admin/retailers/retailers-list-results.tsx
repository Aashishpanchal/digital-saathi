import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import { retailer } from "../../../http";
import DataTable from "../../table/data-table";
import TablePagination from "../../table/table-pagination";
import ActiveDeactive from "../active-deactive";
import { RiDeleteBinFill } from "react-icons/ri";
import DeleteDialogBox from "../../dialog-box/delete-dialog-box";
import { useSnackbar } from "notistack";
import LinkRouter from "../../../routers/LinkRouter";
import { FaRegEdit } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";

export default function RetailerListResults(props: { searchText: string }) {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    retailers: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState("10");
  const [deleteData, setDeleteData] = React.useState<{
    id: string;
    open: boolean;
  }>({
    id: "",
    open: false,
  });

  const { searchText } = props;

  const postfix = React.useMemo(() => {
    return searchText
      ? `${searchText}&page=${page}&size=${size}`
      : `?page=${page}&size=${size}`;
  }, [searchText, page, size]);

  const { enqueueSnackbar } = useSnackbar();

  const deleteBoxClose = () => setDeleteData({ open: false, id: "" });

  const onGet = async () => {
    try {
      setLoading(true);
      const res = await retailer("get", {
        postfix: postfix,
      });
      if (res?.status === 200) {
        setData(res.data);
      }
    } catch (err: any) {
      console.log(err.response);
    }
    setLoading(false);
  };

  const onDelete = async () => {
    try {
      const res: any = await retailer("delete", {
        params: deleteData?.id,
      });
      if (res.status === 200) {
        await onGet();
        enqueueSnackbar("entry success-full deleted 😊", {
          variant: "success",
        });
      }
    } catch (err: any) {
      console.log(err.response);
      enqueueSnackbar("entry not delete 😢", { variant: "error" });
    }
    deleteBoxClose();
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "retailer_id",
      },
      {
        Header: "Status",
        accessor: "active",
        Cell: (cell: any) => (
          <ActiveDeactive
            cell={cell}
            idAccessor="retailer_id"
            setData={setData}
            axiosFunction={retailer}
            postfix={postfix}
          />
        ),
      },
      {
        Header: "Auth Code",
        accessor: "auth_code",
      },
      {
        Header: "Retailer Name",
        accessor: "retailer_name",
      },
      {
        Header: "Action",
        Cell: (cell: any) => (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="Delete">
              <IconButton
                disableRipple={false}
                size="small"
                color="secondary"
                onClick={() =>
                  setDeleteData({
                    open: true,
                    id: cell.row.original.retailer_id,
                  })
                }
              >
                <RiDeleteBinFill />
              </IconButton>
            </Tooltip>
            <LinkRouter to={`${cell.row.original.retailer_id}`}>
              <Tooltip title="Retailer Edit">
                <IconButton
                  disableRipple={false}
                  size="small"
                  color="secondary"
                >
                  <FaRegEdit />
                </IconButton>
              </Tooltip>
            </LinkRouter>
            <LinkRouter
              to={`${
                cell.row.original.retailer_id
              }/retailer-dashboard/${encodeURI(
                cell.row.original.retailer_name || "Null"
              )}`}
            >
              <Tooltip title="Retailer Dashboard">
                <IconButton
                  disableRipple={false}
                  size="small"
                  color="secondary"
                >
                  <MdDashboardCustomize />
                </IconButton>
              </Tooltip>
            </LinkRouter>
          </Box>
        ),
      },
    ],
    [page, size, postfix]
  );

  const getData = React.useMemo(() => data.retailers, [data]);

  React.useEffect(() => {
    onGet();
  }, [page, size, searchText]);

  React.useEffect(() => {
    setPage(0);
  }, [searchText]);

  return (
    <>
      <DataTable
        loading={loading}
        columns={columns}
        data={getData}
        showNotFound={data.totalItems === 0}
        components={{
          pagination: (
            <TablePagination
              page={page}
              pageSize={size}
              totalItems={data.totalItems}
              count={data.totalPages}
              onChangePage={setPage}
              onPageSizeSelect={setSize}
            />
          ),
        }}
      />
      <DeleteDialogBox
        open={deleteData?.open}
        onClickClose={deleteBoxClose}
        onClickOk={onDelete}
      />
    </>
  );
}
