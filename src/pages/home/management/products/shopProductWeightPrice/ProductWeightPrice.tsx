import { Spinner } from "flowbite-react";
import React from "react";
import { FcDeleteDatabase } from "react-icons/fc";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import Button from "../../../../../components/button/Button";
import MainContainer from "../../../../../components/common/MainContainer";
import { DeleteModal } from "../../../../../components/modals";
import { Table, TableActionsCell } from "../../../../../components/table";
import { shopProductWeightPrice } from "../../../../../http";
import { FocusSKUCell } from "../cell";

export default function ProductWeightPrice() {
  const [data, setData] = React.useState<any>([]);
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
      const res = await shopProductWeightPrice("get");
      if (res?.status === 200) {
        const filter = res.data.filter((item: any) => {
          return item.sku_id.toString() === sku_id;
        });
        setData(filter);
      }
    } catch (err: any) {
      console.log(err.response);
    }
    setLoading(false);
  };

  const onUpdate = async (
    setInnerLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setInnerLoading(true);
    try {
      const res = await shopProductWeightPrice("get");
      if (res?.status === 200) {
        const filter = res.data.filter((item: any) => {
          return item.sku_id.toString() === sku_id;
        });
        setData(filter);
      }
    } catch (err: any) {
      console.log(err.response);
    }
    setInnerLoading(false);
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
          <FocusSKUCell
            cell={cell}
            idKey="price_id"
            setData={setData}
            onUpdate={onUpdate}
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
    []
  );

  const getData = React.useMemo(() => data, [data]);

  React.useEffect(() => {
    onGetProductWeightPrice();
  }, []);

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
              color="blue"
              size="xl"
              className="object-cover w-24 h-24"
            />
            <h2 className="dark:text-gray-100">
              Please wait fetch data from server....
            </h2>
          </div>
        ) : data.length !== 0 ? (
          <Table columns={columns} data={getData} />
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
        onClickYes={onProductWeightPriceDelete}
      />
    </AdminContainer>
  );
}
