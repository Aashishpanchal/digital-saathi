import React from "react";
import { Spinner } from "flowbite-react";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { shopAreas } from "../../../../http";
import { useNavigate } from "react-router-dom";
import { FcDeleteDatabase } from "react-icons/fc";
import { DeleteModal } from "../../../../components/modals";
import {
  ActiveDeactivateCell,
  Table,
  TableActionsCell,
} from "../../../../components/table";
import { SelectColumActiveDeactivateFilter } from "../../../../components/filter/SelectColumnFilter";
import Button from "../../../../components/button/Button";
import { TbSquareAsterisk } from "react-icons/tb";

export default function Areas() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [value, setValue] = React.useState<{
    area_id: string;
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }>();
  const navigate = useNavigate();

  const onShopAreasGet = async () => {
    setLoading(true);
    try {
      const res: any = await shopAreas("get");
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err: any) {
      console.log(err.response);
    }
    setLoading(false);
  };

  const onShopAreasDelete = async () => {
    if (value) {
      setDeleteModalShow(false);
      const { area_id, setDeleteLoading } = value;
      setValue(undefined);
      try {
        setDeleteLoading(true);
        const res: any = await shopAreas("delete", {
          params: area_id,
        });
        if (res.status === 200) {
          await onShopAreasGet();
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
    const { area_id, active } = value;

    const isActive = active === 1 ? 0 : 1;
    try {
      setActiveLoading(true);
      const res = await shopAreas("put", {
        params: area_id,
        data: JSON.stringify({
          active: isActive,
        }),
      });
      if (res?.status === 200) {
        await onShopAreasGet();
      }
    } catch (err: any) {
      console.log(err.response);
    }
    setActiveLoading(false);
  };

  const onNew = () => navigate("/masters/areas/new");
  const onShopAreasEdit = (values: { [key: string]: any }) =>
    navigate(`/masters/areas/${values.area_id}`);

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "area_id",
        extraProps: {
          columnStyle: {
            width: "0px",
            textAlign: "center",
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
          align: "center",
        },
      },
      {
        Header: "Areas",
        accessor: "area",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "State",
        accessor: "state",
      },
      {
        Header: "Pincode",
        accessor: "pincode",
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Action",
        Cell: (cell: any) => (
          <TableActionsCell
            cell={cell}
            onDelete={async (value, setDeleteLoading) => {
              setDeleteModalShow(true);
              setValue({
                area_id: value.area_id,
                setDeleteLoading,
              });
            }}
            onEdit={onShopAreasEdit}
          />
        ),
      },
    ],
    []
  );

  const getData = React.useMemo(() => data, [data]);

  React.useEffect(() => {
    onShopAreasGet();
  }, []);

  return (
    <AdminContainer>
      <MainContainer heading="Areas">
        <div className="mb-4">
          <Button
            onClick={onNew}
            icon={<TbSquareAsterisk size={18} />}
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
        onClickYes={onShopAreasDelete}
      />
    </AdminContainer>
  );
}
