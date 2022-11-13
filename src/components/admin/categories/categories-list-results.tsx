import React from "react";
import { useSnackbar } from "notistack";
import { RiDeleteBinFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
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
import usePaginate from "../../../hooks/usePaginate";
import SerialNumber from "../serial-number";
import SortMainDialog from "../sort-main-dialog";
import { queryToStr } from "../utils";

function CategoriesListResults(props: {
  searchText: string;
  addOpen: boolean;
  addClose: () => void;
  categoryPartnerId?: string;

  sortOpen: boolean;
  onSortClose: () => void;
}) {
  const { page, setPage, size, setSize } = usePaginate();
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

  const {
    searchText,
    addClose,
    addOpen,
    categoryPartnerId,
    sortOpen,
    onSortClose,
  } = props;
  const { S3DeleteImage } = useBucket();

  const postfix = React.useMemo(() => {
    const subcategoryStr = categoryPartnerId
      ? `&category_id=${categoryPartnerId}`
      : "";
    const x = queryToStr({
      page,
      size: `${size}${subcategoryStr}`,
    });
    return searchText ? `${searchText}&${x}` : `?${x}`;
  }, [searchText, page, size]);

  const { enqueueSnackbar } = useSnackbar();

  const deleteBoxClose = () => setDeleteData({ open: false, value: {} });

  const { isLoading, refetch, data } = useQuery(
    ["categories/subcategories", postfix],
    () =>
      (categoryPartnerId ? subCategories : categories)("get", {
        postfix,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

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
          await refetch();
          enqueueSnackbar("entry successfully deleted 😊", {
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
        accessor: (_row: any, i: number) => i + 1,
        Cell: (cell: any) => (
          <SerialNumber cell={cell} page={page} size={size} />
        ),
        width: "5%",
      },
      {
        Header: "Status",
        accessor: "active",
        width: "10%",
        Cell: (cell: any) => (
          <ActiveDeactive
            cell={cell}
            idAccessor="category_id"
            axiosFunction={!categoryPartnerId ? categories : subCategories}
            refetch={refetch}
          />
        ),
      },
      {
        Header: (!categoryPartnerId ? "Category" : "Sub-Category") + " Image",
        accessor: "image",
        width: "20%",
        Cell: (cell: any) => (
          <Box display="flex" justifyContent={"center"}>
            <ProductAvatar
              src={cell.value}
              sx={{ width: 50, height: 50 }}
              variant="rounded"
            />
          </Box>
        ),
      },
      {
        Header: (!categoryPartnerId ? "Category" : "Sub-Category") + " Name",
        accessor: "name",
      },
      {
        Header: "Action",
        width: "15%",
        Cell: (cell: any) => (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
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

  const getData = React.useMemo(() => {
    if (data?.status === 200) {
      return data.data;
    }
    return {};
  }, [data]);

  React.useEffect(() => {
    if (searchText) setPage(0);
  }, [searchText]);

  return (
    <>
      <DataTable
        loading={isLoading}
        columns={columns}
        data={
          getData[!categoryPartnerId ? "categories" : "subcategories"] || []
        }
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
        <CategoryAddEditDialog
          open={edit.open}
          close={() => setEdit({ open: false, value: null })}
          category={edit.value}
          reload={refetch}
          variant="edit"
          type={!categoryPartnerId ? "category" : "subcategory"}
          otherData={
            categoryPartnerId ? { parent_category_id: categoryPartnerId } : {}
          }
        />
      )}
      {addOpen && (
        <CategoryAddEditDialog
          open={addOpen}
          close={addClose}
          category={null}
          reload={refetch}
          variant="add"
          type={!categoryPartnerId ? "category" : "subcategory"}
          otherData={
            categoryPartnerId ? { parent_category_id: categoryPartnerId } : {}
          }
        />
      )}
      {sortOpen && (
        <SortMainDialog
          id={"select-".concat(!categoryPartnerId ? "category" : "subcategory")}
          title={"Sort ".concat(
            !categoryPartnerId ? "Categories" : "SubCategories"
          )}
          dataKeyExtract={!categoryPartnerId ? "categories" : "subcategories"}
          open={sortOpen}
          onClose={onSortClose}
          extractObj={{
            value: "name",
            id: "category_id",
          }}
          postfix={
            !categoryPartnerId
              ? ""
              : "?".concat(queryToStr({ category_id: categoryPartnerId }))
          }
          requestFunc={!categoryPartnerId ? categories : subCategories}
          refetch={refetch}
        />
      )}
    </>
  );
}

export default React.memo(CategoriesListResults);
