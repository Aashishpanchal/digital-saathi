import React from "react";
import { useSnackbar } from "notistack";
import { RiDeleteBinFill } from "react-icons/ri";
import { Box, IconButton, Tooltip } from "@mui/material";
import { FaArrowRight, FaRegEdit } from "react-icons/fa";
import { categories, subCategories } from "../../../http";
import useBucket from "../../../hooks/useBucket";
import LinkRouter from "../../../routers/LinkRouter";
import DeleteDialogBox from "../../dialog-box/delete-dialog-box";
import ProductAvatar from "../../Image/product-avatar";
import DataTable from "../../table/data-table";
import TablePagination from "../../table/table-pagination";
import ActiveDeactive from "../active-deactive";
import CategoryAddEditDialog from "./category-add-edit-dialog";

function CategoriesListResults(props: {
  searchText: string;
  addOpen: boolean;
  addClose: () => void;
  categoryPartnerId?: string;
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

  const { searchText, addClose, addOpen, categoryPartnerId } = props;
  const { S3DeleteImage } = useBucket();

  const postfix = React.useMemo(() => {
    const subcategoryStr = categoryPartnerId
      ? `&category_id=${categoryPartnerId}`
      : "";
    return searchText
      ? `${searchText}&page=${page}&size=${size}${subcategoryStr}`
      : `?page=${page}&size=${size}${subcategoryStr}`;
  }, [searchText, page, size]);

  const { enqueueSnackbar } = useSnackbar();

  const deleteBoxClose = () => setDeleteData({ open: false, value: {} });

  const onGet = async () => {
    try {
      setLoading(true);
      const res = await (categoryPartnerId ? subCategories : categories)(
        "get",
        { postfix: postfix }
      );
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
      const { category_id, image } = deleteData.value;
      const metaData = await S3DeleteImage(image);
      if (metaData?.success) {
        const res: any = await (categoryPartnerId ? subCategories : categories)(
          "delete",
          {
            params: category_id,
          }
        );
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
        accessor: "category_id",
      },
      {
        Header: "Status",
        accessor: "active",
        Cell: (cell: any) => (
          <ActiveDeactive
            cell={cell}
            idAccessor="category_id"
            setData={setData}
            axiosFunction={!categoryPartnerId ? categories : subCategories}
            postfix={postfix}
          />
        ),
      },
      {
        Header: "Image",
        accessor: "image",
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
        Header: (!categoryPartnerId ? "Category" : "Sub-Category") + " Name",
        accessor: "name",
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
            <Tooltip
              title={
                (!categoryPartnerId ? "Category" : "Subcategory") + " Edit"
              }
            >
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
            {!categoryPartnerId && (
              <LinkRouter
                to={`${cell.row.original.category_id}/sub-categories`}
              >
                <Tooltip title="Subcategories">
                  <IconButton
                    disableRipple={false}
                    size="small"
                    color="secondary"
                  >
                    <FaArrowRight />
                  </IconButton>
                </Tooltip>
              </LinkRouter>
            )}
          </Box>
        ),
      },
    ],
    [page, size, postfix]
  );

  const getData = React.useMemo(
    () => data[!categoryPartnerId ? "categories" : "subcategories"] || [],
    [data]
  );

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
        <CategoryAddEditDialog
          open={edit.open}
          close={() => setEdit({ open: false, value: null })}
          category={edit.value}
          reload={onGet}
          variant="edit"
          type={!categoryPartnerId ? "category" : "subcategory"}
        />
      )}
      {addOpen && (
        <CategoryAddEditDialog
          open={addOpen}
          close={addClose}
          category={null}
          reload={onGet}
          variant="add"
          type={!categoryPartnerId ? "category" : "subcategory"}
        />
      )}
    </>
  );
}

export default React.memo(CategoriesListResults);
