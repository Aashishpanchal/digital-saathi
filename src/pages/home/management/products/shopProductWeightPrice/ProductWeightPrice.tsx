import { Spinner } from "flowbite-react";
import React from "react";
import { TbDatabaseOff } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import Button from "../../../../../components/button/Button";
import MainContainer from "../../../../../components/common/MainContainer";
import { DeleteModal } from "../../../../../components/modals";
import { Table, TableActionsCell } from "../../../../../components/table";
import { shopProductWeightPrice } from "../../../../../http";
import FocusStarCell from "../../../../../components/table/cell/FocusStarCell";

export default function ProductWeightPrice() {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    product_prices: [],
  });
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [value, setValue] = React.useState<{
    price_id: string;
    setInnerLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const { sku_id, sku_name } = useParams();
  const navigate = useNavigate();

  const onGetProductWeightPrice = async () => {
    setLoading(true);
    try {
      const res = await shopProductWeightPrice("get", {
        postfix: `?page=${page}&sku_id=${sku_id}`,
      });
      if (res?.status === 200) {
        setData(res.data);
      }
    } catch (err: any) {
      console.log(err.response);
    }
    setLoading(false);
  };

  const onProductWeightPriceDelete = async () => {
    if (value) {
      setDeleteModalShow(false);
      const { price_id, setInnerLoading } = value;
      setValue(undefined);
      try {
        setInnerLoading(true);
        const res: any = await shopProductWeightPrice("delete", {
          params: price_id,
        });
        if (res.status === 200) {
          await onGetProductWeightPrice();
        }
      } catch (err: any) {
        console.log(err.response);
      }
      setInnerLoading(false);
    }
  };

  const onEdit = (values: { [key: string]: any }) => {
    navigate(`${values.price_id}`);
  };

  const onNew = () => navigate(`new`);

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "price_id",
        extraProps: {
          columnStyle: {
            width: "0px",
            textAlign: "center",
            paddingRight: "0px",
          },
        },
      },
      {
        Header: "MRP",
        accessor: "mrp",
      },
      {
        Header: "IGST",
        accessor: "igst",
        Cell: (cell: any) => <div>{cell.value}%</div>,
      },
      {
        Header: "SGST",
        accessor: "sgst",
        Cell: (cell: any) => <div>{cell.value}%</div>,
      },
      {
        Header: "cgst",
        accessor: "cgst",
        Cell: (cell: any) => <div>{cell.value}%</div>,
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Weight",
        accessor: "weight",
      },
      {
        Header: "Package",
        accessor: "package",
      },
      {
        Header: "Units Per Case",
        accessor: "units_per_case",
      },
      {
        Header: "Focus SKU",
        accessor: "focus_sku",
        Cell: (cell: any) => (
          <FocusStarCell
            cell={cell}
            idKey="price_id"
            setData={setData}
            axiosFunction={shopProductWeightPrice}
            postfix={`?page=${page}&sku_id=${sku_id}`}
            payload={["sku_id", "mrp", "price", "weight", "package"]}
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
                price_id: value.price_id,
                setInnerLoading,
              });
            }}
            onEdit={onEdit}
          />
        ),
      },
    ],
    [page]
  );

  const getData = React.useMemo(() => data.product_prices, [data, page]);

  React.useEffect(() => {
    onGetProductWeightPrice();
  }, [page]);

  return (
    <AdminContainer>
      <MainContainer heading={`${sku_name} / Price`}>
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
        onClickYes={onProductWeightPriceDelete}
      />
    </AdminContainer>
  );
}
