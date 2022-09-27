import { Spinner } from "flowbite-react";
import React from "react";
import { TbDatabaseOff, TbTruckDelivery } from "react-icons/tb";
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
import { shopDeliveryAgent } from "../../../../../http";

export default function DeliveryAgentRetailer() {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    brands: [],
    agents: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState(10);
  const [value, setValue] = React.useState<{
    agent_id: string;
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const { partner_name, partner_id } = useParams();
  const navigate = useNavigate();

  const onDPRetailerGet = async () => {
    setLoading(true);
    try {
      const res: any = await shopDeliveryAgent("get", {
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
      const { agent_id, setDeleteLoading } = value;
      setValue(undefined);
      try {
        setDeleteLoading(true);
        const res: any = await shopDeliveryAgent("delete", {
          params: agent_id,
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

  const onDPEdit = (values: { [key: string]: any }) =>
    navigate(`${values.agent_id}`);

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "agent_id",
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
            idKey="agent_id"
            setData={setData}
            axiosFunction={shopDeliveryAgent}
          />
        ),
      },
      {
        Header: "Agent Name",
        accessor: "agent_name",
        extraProps: {
          columnStyle: { textAlign: "center" },
        },
      },
      {
        Header: "Email",
        accessor: "email_id",
        extraProps: {
          columnStyle: { textAlign: "center" },
        },
      },
      {
        Header: "Phone Number",
        accessor: "phone_no",
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
                agent_id: value.agent_id,
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

  const getData = React.useMemo(() => data.agents, [data, page]);

  React.useEffect(() => {
    onDPRetailerGet();
  }, [page, size]);

  return (
    <AdminContainer>
      <MainContainer heading={`${partner_name} / Retailer`}>
        <div className="mb-4">
          <Button url="new" icon={<TbTruckDelivery size={18} />} color="dark">
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
