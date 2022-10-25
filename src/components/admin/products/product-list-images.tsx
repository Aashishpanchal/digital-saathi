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
import usePaginate from "../../../hooks/usePaginate";
import { useQuery } from "@tanstack/react-query";

export default function ProductListImages(props: {
  sku_id: string;
  uploadOpen: boolean;
  uploadClose: () => void;
}) {
  const { page, setPage, size, setSize } = usePaginate();
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

  const { isLoading, refetch, data } = useQuery(
    ["products-images", postfix],
    () =>
      shopProductImages("get", {
        postfix,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const onDelete = async () => {
    try {
      const { image_id, image } = deleteData.value;
      const metaData = await S3DeleteImage(image);
      if (metaData?.success) {
        const res: any = await shopProductImages("delete", {
          params: image_id,
        });
        if (res.status === 200) {
          await refetch();
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
            refetch={refetch}
            axiosFunction={shopProductImages}
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
            refetch={refetch}
            axiosFunction={shopProductImages}
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

  const getData = React.useMemo(() => {
    if (data?.status === 200) {
      return data.data;
    }
    return { totalItems: 0, totalPages: 1, product_images: [] };
  }, [data]);

  return (
    <>
      <DataTable
        loading={isLoading}
        columns={columns}
        data={getData.product_images}
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
          reload={refetch}
          skuId={sku_id}
        />
      )}
      {uploadOpen && (
        <ProductImageDialog
          open={uploadOpen}
          close={uploadClose}
          reload={refetch}
          skuId={sku_id}
        />
      )}
    </>
  );
}
