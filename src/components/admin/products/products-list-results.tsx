import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import { shopProducts } from "../../../http";
import DataTable from "../../table/data-table";
import TablePagination from "../../table/table-pagination";
import ActiveDeactive from "../active-deactive";
import FocusStar from "../focus-star";
import { RiDeleteBinFill } from "react-icons/ri";
import DeleteDialogBox from "../../dialog-box/delete-dialog-box";
import { useSnackbar } from "notistack";
import { TbListDetails } from "react-icons/tb";
import LinkRouter from "../../../routers/LinkRouter";
import { FaRegEdit, FaRegFileImage, FaRupeeSign } from "react-icons/fa";
import ProductPriceDialog from "./product-price-dialog";
import usePaginate from "../../../hooks/usePaginate";
import { useQuery } from "@tanstack/react-query";
import SerialNumber from "../serial-number";

export default function ProductsListResults(props: { searchText: string }) {
  const { page, setPage, size, setSize } = usePaginate();
  const [deleteData, setDeleteData] = React.useState<{
    id: string;
    open: boolean;
  }>({
    id: "",
    open: false,
  });
  const [price, setPrice] = React.useState({
    open: false,
    id: "",
  });
  const { searchText } = props;

  const postfix = React.useMemo(() => {
    return searchText
      ? `${searchText}&page=${page}&size=${size}`
      : `?page=${page}&size=${size}`;
  }, [searchText, page, size]);

  const { isLoading, refetch, data } = useQuery(
    ["products", postfix],
    () =>
      shopProducts("get", {
        postfix,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { enqueueSnackbar } = useSnackbar();

  const deleteBoxClose = () => setDeleteData({ open: false, id: "" });

  const onDelete = async () => {
    try {
      const res: any = await shopProducts("delete", {
        params: deleteData?.id,
      });
      if (res.status === 200) {
        await refetch();
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
        accessor: (_row: any, i: number) => i + 1,
        Cell: (cell: any) => (
          <SerialNumber cell={cell} page={page} size={size} />
        ),
        width: "5%",
      },
      // {
      //   Header: "S No.",
      //   accessor: "sku_id",
      // },
      {
        Header: "Status",
        accessor: "active",
        Cell: (cell: any) => (
          <ActiveDeactive
            cell={cell}
            idAccessor="sku_id"
            refetch={refetch}
            axiosFunction={shopProducts}
          />
        ),
      },
      {
        Header: "SKU Name",
        accessor: "sku_name",
      },
      {
        Header: "SKU Name Kannada",
        accessor: "sku_name_kannada",
      },
      {
        Header: "SKU Code",
        accessor: "sku_code",
      },
      {
        Header: "Category",
        accessor: "category_name",
      },
      {
        Header: "Focus SKU",
        accessor: "focus_sku",
        Cell: (cell: any) => (
          <FocusStar
            cell={cell}
            idAccessor="sku_id"
            refetch={refetch}
            axiosFunction={shopProducts}
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
                  setDeleteData({ open: true, id: cell.row.original.sku_id })
                }
              >
                <RiDeleteBinFill />
              </IconButton>
            </Tooltip>
            <LinkRouter to={`${cell.row.original.sku_id}`}>
              <Tooltip title="Product Edit">
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
              to={`${cell.row.original.sku_id}/product-details/${encodeURI(
                cell.row.original.sku_name
              )}`}
            >
              <Tooltip title="Product Details">
                <IconButton
                  disableRipple={false}
                  size="small"
                  color="secondary"
                >
                  <TbListDetails />
                </IconButton>
              </Tooltip>
            </LinkRouter>
            <Tooltip title="Product Price">
              <IconButton
                disableRipple={false}
                size="small"
                color="secondary"
                onClick={() => {
                  setPrice({
                    open: true,
                    id: cell.row.original.sku_id,
                  });
                }}
              >
                <FaRupeeSign />
              </IconButton>
            </Tooltip>
            <LinkRouter
              to={`${cell.row.original.sku_id}/product-more-images/${encodeURI(
                cell.row.original.sku_name
              )}`}
            >
              <Tooltip title="Product Images">
                <IconButton
                  disableRipple={false}
                  size="small"
                  color="secondary"
                >
                  <FaRegFileImage />
                </IconButton>
              </Tooltip>
            </LinkRouter>
          </Box>
        ),
      },
    ],
    [page, size, postfix]
  );

  const getData = React.useMemo(() => {
    if (data?.status === 200) {
      return data.data;
    }
    return {
      totalItems: 0,
      totalPages: 1,
      product: [],
    };
  }, [data]);

  React.useEffect(() => {
    if (searchText) setPage(0);
  }, [searchText]);

  return (
    <>
      <DataTable
        loading={isLoading}
        columns={columns}
        data={getData.product || []}
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
      {price.open && (
        <ProductPriceDialog
          open={price.open}
          id={price.id}
          close={() => setPrice({ open: false, id: "" })}
        />
      )}
    </>
  );
}
