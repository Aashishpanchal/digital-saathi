import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import { shopProductImages } from "../../../http";
import DataTable from "../../table/data-table";
import TablePagination from "../../table/table-pagination";
import ActiveDeactive from "../active-deactive";
import FocusStar from "../focus-star";
import { RiDeleteBinFill } from "react-icons/ri";
import DeleteDialogBox from "../../dialog-box/delete-dialog-box";
import { useSnackbar } from "notistack";
import ProductAvatar from "../../Image/product-avatar";
import useBucket from "../../../hooks/useBucket";
import ProductImageDialog from "./product-image-dialog";
import { FaRegEdit } from "react-icons/fa";
import { date } from "yup/lib/locale";

export default function ProductListImages(props: {
  sku_id: string;
  uploadOpen: boolean;
  uploadClose: () => void;
}) {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    product_images: [],
  });
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
  const [edit, setEdit] = React.useState({
    id: "",
    open: false,
  });

  const { sku_id, uploadOpen, uploadClose } = props;
  const { S3DeleteImage } = useBucket();

  const postfix = React.useMemo(() => {
    return `?page=${page}&size=${size}&sku_id=${sku_id}`;
  }, [page, size]);

  const { enqueueSnackbar } = useSnackbar();

  const deleteBoxClose = () => setDeleteData({ open: false, value: {} });

  const onGet = async () => {
    try {
      setLoading(true);
      const res = await shopProductImages("get", {
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
      const { image_id, image } = deleteData.value;
      const metaData = await S3DeleteImage(image);
      if (metaData?.success) {
        const res: any = await shopProductImages("delete", {
          params: image_id,
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
        accessor: "image_id",
      },
      {
        Header: "Product Image",
        accessor: "image",
        Cell: (cell: any) => {
          return (
            <ProductAvatar
              src={cell.value}
              sx={{ width: 50, height: 50 }}
              variant="rounded"
            />
          );
        },
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Status",
        accessor: "active",
        Cell: (cell: any) => (
          <ActiveDeactive
            cell={cell}
            idAccessor="image_id"
            payload={["sku_id", "image"]}
            setData={setData}
            axiosFunction={shopProductImages}
            postfix={postfix}
          />
        ),
      },
      {
        Header: "Focus SKU",
        accessor: "focus_sku",
        Cell: (cell: any) => (
          <FocusStar
            cell={cell}
            idAccessor="image_id"
            payload={["sku_id", "image"]}
            axiosFunction={shopProductImages}
            postfix={postfix}
            setData={setData}
          />
        ),
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
            <Tooltip title="Product Image Edit">
              <IconButton
                disableRipple={false}
                size="small"
                color="secondary"
                onClick={() =>
                  setEdit({ open: true, id: cell.row.original.image_id })
                }
              >
                <FaRegEdit />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [page, size]
  );

  const getData = React.useMemo(() => data.product_images, [data]);

  React.useEffect(() => {
    onGet();
  }, [page, size]);

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
        <ProductImageDialog
          open={edit.open}
          close={() => setEdit({ open: false, id: "" })}
          imageId={edit.id}
          reload={onGet}
          skuId={sku_id}
        />
      )}
      {uploadOpen && (
        <ProductImageDialog
          open={uploadOpen}
          close={uploadClose}
          reload={onGet}
          skuId={sku_id}
        />
      )}
    </>
  );
}
