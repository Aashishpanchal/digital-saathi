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
import { CategoryCell, FocusSKUCell } from "./cell";

export default function Products() {
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [value, setValue] = React.useState<{
    sku_id: string;
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const [page, setPage] = React.useState(1);

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
      const { sku_id, setDeleteLoading } = value;
      setValue(undefined);
      try {
        setDeleteLoading(true);
        const res: any = await shopProducts("delete", {
          params: sku_id,
        });
        if (res.status === 200) {
          await onProductsGet();
        }
      } catch (err: any) {
        console.log(err.response);
      }
      setDeleteLoading(false);
    }
  };

  const onActivate = async (
    value: { [key: string]: any },
    setActiveLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const { sku_id, active } = value;
    const isActive = active === 1 ? 0 : 1;
    try {
      setActiveLoading(true);
      const res = await shopProducts("put", {
        params: sku_id,
        data: JSON.stringify({
          active: isActive,
        }),
      });
      if (res?.status === 200) {
        await onProductsGet();
      }
    } catch (err: any) {
      console.log(err.response);
    }
    setActiveLoading(false);
  };

  const onShopProductEdit = (value: { [key: string]: any }) =>
    navigate(`/management/products/${value.sku_id}`);

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
          <ActiveDeactivateCell cell={cell} onClick={onActivate} />
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
        Cell: (cell: any) => <CategoryCell category_id={cell.value} />,
      },
      {
        Header: "Focus SKU",
        accessor: "focus_sku",
        Cell: (cell: any) => <FocusSKUCell cell={cell} />,
      },
      {
        Header: "Action",
        Cell: (cell: any) => (
          <TableActionsCell
            cell={cell}
            onDelete={async (value, setDeleteLoading) => {
              setDeleteModalShow(true);
              setValue({
                sku_id: value.sku_id,
                setDeleteLoading,
              });
            }}
            onEdit={onShopProductEdit}
          />
        ),
      },
    ],
    []
  );

  const getData = React.useMemo(() => data, [data]);

  React.useEffect(() => {
    onProductsGet();
  }, [page]);

  return (
    <AdminContainer>
      <MainContainer heading="Products">
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
        ) : data.length !== 0 ? (
          <Table
            columns={columns}
            data={getData}
            showPagination
            page={page}
            changePage={(page: number) => setPage(page)}
            totalEntries={476}
            totalPages={10}
            entriesPerPage={data.length}
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
