import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import { farmers } from "../../../http";
import DataTable from "../../table/data-table";
import TablePagination from "../../table/table-pagination";
import ActiveDeactive from "../active-deactive";
import { RiDeleteBinFill } from "react-icons/ri";
import DeleteDialogBox from "../../dialog-box/delete-dialog-box";
import { useSnackbar } from "notistack";
import LinkRouter from "../../../routers/LinkRouter";
import { FaArrowRight, FaRegEdit } from "react-icons/fa";
import FarmersFormDialog from "./farmers-form-dialog";

export default function FarmersListResults(props: { searchText: string }) {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    customers: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState("10");
  const [deleteData, setDeleteData] = React.useState({
    id: "",
    open: false,
  });
  const [edit, setEdit] = React.useState({
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
      const res = await farmers("get", {
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
      const res: any = await farmers("delete", {
        params: deleteData?.id,
      });
      if (res.status === 200) {
        await onGet();
        enqueueSnackbar("entry success-full deleted 😊", {
          variant: "success",
        });
      }
    } catch (err: any) {
      console.log(err);
      enqueueSnackbar("entry not delete 😢", { variant: "error" });
    }
    deleteBoxClose();
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "customer_id",
      },
      {
        Header: "Status",
        accessor: "active",
        Cell: (cell: any) => (
          <ActiveDeactive
            cell={cell}
            idAccessor="customer_id"
            setData={setData}
            axiosFunction={farmers}
            postfix={postfix}
          />
        ),
      },
      {
        Header: "Auth Code",
        accessor: "auth_code",
      },
      {
        Header: "Customer Name",
        accessor: "customer_name",
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
                    id: cell.row.original.customer_id,
                  })
                }
              >
                <RiDeleteBinFill />
              </IconButton>
            </Tooltip>
            <Tooltip title="Farmer Edit">
              <IconButton
                disableRipple={false}
                size="small"
                color="secondary"
                onClick={() =>
                  setEdit({
                    open: true,
                    id: cell.row.original.customer_id,
                  })
                }
              >
                <FaRegEdit />
              </IconButton>
            </Tooltip>
            <LinkRouter
              to={`${cell.row.original.customer_id}/product-details/${encodeURI(
                cell.row.original.sku_name
              )}`}
            >
              <Tooltip title="Farmers Orders">
                <IconButton
                  disableRipple={false}
                  size="small"
                  color="secondary"
                >
                  <FaArrowRight />
                </IconButton>
              </Tooltip>
            </LinkRouter>
          </Box>
        ),
      },
    ],
    [page, size]
  );

  const getData = React.useMemo(() => data.customers, [data]);

  React.useEffect(() => {
    onGet();
  }, [page, size, searchText]);

  return (
    <>
      <DataTable
        loading={loading}
        columns={columns}
        data={getData}
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
      {edit.open && (
        <FarmersFormDialog
          open={edit.open}
          customerId={edit.id}
          close={() => setEdit({ open: false, id: "" })}
          reload={onGet}
        />
      )}
    </>
  );
}
