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
import { farmers } from "../../../../http";
import { TbDatabaseOff } from "react-icons/tb";
import { DeleteModal } from "../../../../components/modals";
import Auth0UserInformation from "../../../../components/table/cell/Auth0UserInformation";

export default function Farmers() {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    customers: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [value, setValue] = React.useState<{
    customer_id: string;
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState(10);

  const navigate = useNavigate();

  const onFarmerGet = async () => {
    setLoading(true);
    try {
      const res: any = await farmers("get", {
        postfix: `?page=${page}&size=${size}`,
      });
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err: any) {
      console.log(err);
    }
    setLoading(false);
  };

  const onFarmerDelete = async () => {
    if (value) {
      setDeleteModalShow(false);
      const { customer_id, setDeleteLoading } = value;
      setValue(undefined);
      try {
        setDeleteLoading(true);
        const res: any = await farmers("delete", {
          params: customer_id,
        });
        if (res.status === 200) {
          await onFarmerGet();
        }
      } catch (err: any) {
        console.log(err.response);
      }
      setDeleteLoading(false);
    }
  };

  const onFarmerEdit = (value: { [key: string]: any }) =>
    navigate(`/management/farmers/${value.customer_id}`);

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "customer_id",
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
            // idKey="customer_id"
            // axiosFunction={farmers}
            // setData={setData}
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
        Header: "Auth Code",
        accessor: "auth_code",
        extraProps: {
          columnStyle: { textAlign: "center" },
        },
        Cell: Auth0UserInformation,
      },
      {
        Header: "Customer Name",
        accessor: "customer_name",
      },
      {
        Header: "Action",
        Cell: (cell: any) => (
          <TableActionsCell
            cell={cell}
            onDelete={async (value, setDeleteLoading) => {
              setDeleteModalShow(true);
              setValue({
                customer_id: value.customer_id,
                setDeleteLoading,
              });
            }}
            onEdit={onFarmerEdit}
          />
        ),
      },
    ],
    []
  );

  const getData = React.useMemo(() => data.customers, [data, page]);

  React.useEffect(() => {
    onFarmerGet();
  }, [page, size]);

  return (
    <AdminContainer>
      <MainContainer heading="Packages">
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
        onClickYes={onFarmerDelete}
      />
    </AdminContainer>
  );
}
