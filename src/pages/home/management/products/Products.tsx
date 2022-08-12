import { Spinner } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { SelectColumActiveDeactivateFilter } from "../../../../components/filter/SelectColumnFilter";
import {
  ActiveDeactivateCell,
  Table,
  TableActionsCell,
} from "../../../../components/table";
import { shopProducts } from "../../../../http";
import { TbDatabaseOff } from "react-icons/tb";
import { DeleteModal } from "../../../../components/modals";
import FocusStarCell from "../../../../components/table/cell/FocusStarCell";
import Button from "../../../../components/button/Button";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaFileImport } from "react-icons/fa";

export default function Products() {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    products: [],
  });
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [value, setValue] = React.useState<{
    sku_id: string;
    setInnerLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const [page, setPage] = React.useState(0);

  const onProductsGet = async () => {
    setLoading(true);
    try {
      const res = await shopProducts("get", { postfix: `?page=${page}` });
      if (res?.status === 200) {
        setData(res.data);
      }
    } catch (err: any) {
      console.log(err.response);
    }
    setLoading(false);
  };

  const onCategoryDelete = async () => {
    if (value) {
      setDeleteModalShow(false);
      const { sku_id, setInnerLoading } = value;
      setValue(undefined);
      try {
        setInnerLoading(true);
        const res: any = await shopProducts("delete", {
          params: sku_id,
        });
        if (res.status === 200) {
          await onProductsGet();
        }
      } catch (err: any) {
        console.log(err.response);
      }
      setInnerLoading(false);
    }
  };

  const onShopProductEdit = (values: { [key: string]: any }) =>
    navigate(`${values.sku_id}`);
  const onMoreImage = (values: { [key: string]: any }) =>
    navigate(
      `${values.sku_id}/product-more-images/${encodeURI(values.sku_name)}`
    );
  const onProductDetails = (values: { [key: string]: any }) =>
    navigate(`${values.sku_id}/product-details/${encodeURI(values.sku_name)}`);
  const onProductWeightPrice = (values: { [key: string]: any }) =>
    navigate(
      `${values.sku_id}/product-weight-price/${encodeURI(values.sku_name)}`
    );

  const onImport = () => navigate("product-import-export");
  const onNew = () => navigate("new");

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "sku_id",
        extraProps: {
          columnStyle: {
            width: "0px",
            textAlign: "center",
            paddingRight: "0px",
          },
        },
      },
      {
        Header: "Status",
        accessor: "active",
        Filter: SelectColumActiveDeactivateFilter,
        filter: "equals",
        Cell: (cell: any) => (
          <ActiveDeactivateCell
            cell={cell}
            idKey="sku_id"
            axiosFunction={shopProducts}
            setData={setData}
          />
        ),
        extraProps: {
          columnStyle: {
            width: "250px",
            textAlign: "center",
            paddingRight: "0px",
          },
          align: "center",
        },
      },
      {
        Header: "SKU Name",
        accessor: "sku_name",
        extraProps: {
          columnStyle: { textAlign: "center" },
        },
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
        accessor: "category_id",
      },
      {
        Header: "Focus SKU",
        accessor: "focus_sku",
        Cell: (cell: any) => (
          <FocusStarCell
            cell={cell}
            idKey="sku_id"
            setData={setData}
            axiosFunction={shopProducts}
            postfix={`?page=${page}`}
          />
        ),
      },
      {
        Header: "Action",
        Cell: (cell: any) => (
          <TableActionsCell
            cell={cell}
            onDelete={async (value, setInnerLoading) => {
              setDeleteModalShow(true);
              setValue({
                sku_id: value.sku_id,
                setInnerLoading,
              });
            }}
            onEdit={onShopProductEdit}
            onWeightPrice={onProductWeightPrice}
            onImage={onMoreImage}
            onView={onProductDetails}
          />
        ),
      },
    ],
    [data]
  );

  const getData = React.useMemo(() => data.products, [data, page]);

  React.useEffect(() => {
    onProductsGet();
  }, [page]);

  return (
    <AdminContainer>
      <MainContainer heading="Products">
        <div className="mb-4 flex">
          <Button
            onClick={onNew}
            icon={<MdProductionQuantityLimits size={18} />}
            color="dark"
          >
            New
          </Button>
          <Button
            onClick={onImport}
            icon={<FaFileImport size={18} />}
            color="dark"
          >
            Import
          </Button>
        </div>
        {loading ? (
          <div className="flex flex-col justify-center items-center space-y-3 mt-4">
            <Spinner
              color="green"
              size="xl"
              className="object-cover w-24 h-24"
            />
            <h2 className="dark:text-gray-100">
              Please wait fetch data from server....
            </h2>
          </div>
        ) : data.totalItems ? (
          <Table
            columns={columns}
            data={getData}
            showPagination
            page={page}
            changePage={(page: number) => setPage(page)}
            totalEntries={data.totalItems}
            totalPages={data.totalPages - 1}
            entriesPerPage={10}
            showExport
            exportFileName="Product-Data"
          />
        ) : (
          <div className="flex flex-col space-y-4 justify-center items-center font-bold">
            <TbDatabaseOff size={100} className="text-blue-light" />
            <h2 className="text-lg">Sorry Data Not Available</h2>
          </div>
        )}
      </MainContainer>
      <DeleteModal
        show={deleteModalShow}
        onClose={() => setDeleteModalShow(false)}
        onClickNo={() => setDeleteModalShow(false)}
        onClickYes={onCategoryDelete}
      />
    </AdminContainer>
  );
}
