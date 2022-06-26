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
import { FcDeleteDatabase } from "react-icons/fc";
import { DeleteModal } from "../../../../components/modals";
import { FocusSKUCell } from "./cell";
import Button from "../../../../components/button/Button";
import { MdProductionQuantityLimits } from "react-icons/md";

export default function Products() {
  const [data, setData] = React.useState<any>({
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

  const onShopProductEdit = (value: { [key: string]: any }) =>
    navigate(`/management/products/${value.sku_id}`);

  const onProductWeightPrice = (value: { [key: string]: any }) =>
    navigate(
      `/management/products/${value.sku_id}/product-weight-price/${encodeURI(
        value.sku_name
      )}`
    );

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
          <FocusSKUCell cell={cell} idKey="sku_id" setData={setData} />
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
          />
        ),
      },
    ],
    []
  );

  const getData = React.useMemo(() => data.products, [data, page]);

  React.useEffect(() => {
    onProductsGet();
  }, [page]);

  return (
    <AdminContainer>
      <MainContainer heading="Products">
        <div className="mb-4">
          <Button
            onClick={onNew}
            icon={<MdProductionQuantityLimits size={18} />}
            color="dark"
          >
            New
          </Button>
        </div>
        {loading ? (
          <div className="flex flex-col justify-center items-center space-y-3 mt-4">
            <Spinner
              color="blue"
              size="xl"
              className="object-cover w-24 h-24"
            />
            <h2 className="dark:text-gray-100">
              Please wait fetch data from server....
            </h2>
          </div>
        ) : data.products ? (
          <Table
            columns={columns}
            data={getData}
            showPagination
            page={page}
            changePage={(page: number) => setPage(page)}
            totalEntries={data.totalItems}
            totalPages={data.totalPages - 1}
            entriesPerPage={10}
          />
        ) : (
          <div className="flex flex-col space-y-4 justify-center items-center font-bold">
            <FcDeleteDatabase size={100} />
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
