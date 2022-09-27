import { Spinner } from "flowbite-react";
import React from "react";
import { TbDatabaseOff } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import Button from "../../../../../components/button/Button";
import MainContainer from "../../../../../components/common/MainContainer";
import { SelectColumActiveDeactivateFilter } from "../../../../../components/filter/SelectColumnFilter";
import { DeleteModal } from "../../../../../components/modals";
import {
  ActiveDeactivateCell,
  Table,
  TableActionsCell,
} from "../../../../../components/table";
import { deliveryRetailer } from "../../../../../http";

export default function DeliveryPartnersRetailer() {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    brands: [],
    retailers: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState(10);

  const [value, setValue] = React.useState<{
    del_ret_id: string;
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const { partner_name, partner_id } = useParams();
  const navigate = useNavigate();

  const onDPRetailerGet = async () => {
    setLoading(true);
    try {
      const res: any = await deliveryRetailer("get", {
        postfix: `?page=${page}&size=${size}&partner_id=${partner_id}`,
      });
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err: any) {
      console.log(err);
    }
    setLoading(false);
  };

  const onDPRetailerDelete = async () => {
    if (value) {
      setDeleteModalShow(false);
      const { del_ret_id, setDeleteLoading } = value;
      setValue(undefined);
      try {
        setDeleteLoading(true);
        const res: any = await deliveryRetailer("delete", {
          params: del_ret_id,
        });
        if (res.status === 200) {
          await onDPRetailerGet();
        }
      } catch (err: any) {
        console.log(err.response);
      }
      setDeleteLoading(false);
    }
  };

  const onNew = () => navigate("new");
  const onDPEdit = (values: { [key: string]: any }) =>
    navigate(`${values.del_ret_id}`);

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "del_ret_id",
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
        extraProps: {
          columnStyle: {
            width: "250px",
            textAlign: "center",
            paddingRight: "0px",
          },
          align: "center",
        },
        Cell: (cell: any) => (
          <ActiveDeactivateCell
            cell={cell}
            idKey="del_ret_id"
            setData={setData}
            axiosFunction={deliveryRetailer}
          />
        ),
      },
      {
        Header: "Retailer Name",
        accessor: "retailer_id",
        extraProps: {
          columnStyle: { textAlign: "center" },
        },
      },
      {
        Header: "Action",
        Cell: (cell: any) => (
          <TableActionsCell
            cell={cell}
            onDelete={async (value, setDeleteLoading) => {
              setDeleteModalShow(true);
              setValue({
                del_ret_id: value.del_ret_id,
                setDeleteLoading,
              });
            }}
            onEdit={onDPEdit}
          />
        ),
      },
    ],
    []
  );

  const getData = React.useMemo(() => data.retailers, [data, page]);

  React.useEffect(() => {
    onDPRetailerGet();
  }, [page, size]);

  return (
    <AdminContainer>
      <MainContainer heading={`${partner_name} / Retailer`}>
        <div className="mb-4">
          <Button
            onClick={onNew}
            icon={<TbTruckDelivery size={18} />}
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
            entriesPerPage={size}
            changePageSize={(value) => setSize(value)}
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
        onClickYes={onDPRetailerDelete}
      />
    </AdminContainer>
  );
}
