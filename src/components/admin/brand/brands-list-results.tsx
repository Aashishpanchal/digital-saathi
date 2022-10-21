import React from "react";
import { useSnackbar } from "notistack";
import { RiDeleteBinFill } from "react-icons/ri";
import { Box, IconButton, Tooltip } from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { brands } from "../../../http";
import useBucket from "../../../hooks/useBucket";
import DeleteDialogBox from "../../dialog-box/delete-dialog-box";
import ProductAvatar from "../../Image/product-avatar";
import DataTable from "../../table/data-table";
import TablePagination from "../../table/table-pagination";
import ActiveDeactive from "../active-deactive";
import BrandAddEditDialog from "./brand-add-edit-dialog";

function BrandsListResults(props: {
  searchText: string;
  addOpen: boolean;
  addClose: () => void;
}) {
  const [data, setData] = React.useState<{ [key: string]: any }>({});
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState("10");
  const [deleteData, setDeleteData] = React.useState<{
    value: { [key: string]: any };
    open: boolean;
  }>({
    value: {},
    open: false,
  });
  const [edit, setEdit] = React.useState<{
    value: { [key: string]: any } | null;
    open: boolean;
  }>({
    value: null,
    open: false,
  });

  const { searchText, addClose, addOpen } = props;
  const { S3DeleteImage } = useBucket();

  const postfix = React.useMemo(() => {
    return searchText
      ? `${searchText}&page=${page}&size=${size}`
      : `?page=${page}&size=${size}`;
  }, [searchText, page, size]);

  const { enqueueSnackbar } = useSnackbar();

  const deleteBoxClose = () => setDeleteData({ open: false, value: {} });

  const onGet = async () => {
    try {
      setLoading(true);
      const res = await brands("get", { postfix: postfix });
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
      const { brand_id, image } = deleteData.value;
      const metaData = await S3DeleteImage(image);
      if (metaData?.success) {
        const res: any = await brands("delete", {
          params: brand_id,
        });
        if (res.status === 200) {
          await onGet();
          enqueueSnackbar("entry success-full deleted 😊", {
            variant: "success",
          });
        }
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
        accessor: "brand_id",
      },
      {
        Header: "Status",
        accessor: "active",
        Cell: (cell: any) => (
          <ActiveDeactive
            cell={cell}
            idAccessor="brand_id"
            setData={setData}
            axiosFunction={brands}
            postfix={postfix}
          />
        ),
      },
      {
        Header: "Brand Image",
        accessor: "brand_image",
        Cell: (cell: any) => {
          return (
            <Box display="flex" justifyContent={"center"}>
              <ProductAvatar
                src={cell.value}
                sx={{ width: 100, height: 50 }}
                variant="rounded"
              />
            </Box>
          );
        },
      },
      {
        Header: "Brand Name",
        accessor: "brand_name",
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
                  setDeleteData({ open: true, value: cell.row.original })
                }
              >
                <RiDeleteBinFill />
              </IconButton>
            </Tooltip>
            <Tooltip title="Brand Edit">
              <IconButton
                disableRipple={false}
                size="small"
                color="secondary"
                onClick={() =>
                  setEdit({ open: true, value: cell.row.original })
                }
              >
                <FaRegEdit />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [page, size, postfix]
  );

  const getData = React.useMemo(() => data?.brands || [], [data]);

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
      {edit.open && (
        <BrandAddEditDialog
          open={edit.open}
          close={() => setEdit({ open: false, value: null })}
          brand={edit.value}
          reload={onGet}
          variant="edit"
        />
      )}
      {addOpen && (
        <BrandAddEditDialog
          open={addOpen}
          close={addClose}
          brand={null}
          reload={onGet}
          variant="add"
        />
      )}
    </>
  );
}

export default React.memo(BrandsListResults);
