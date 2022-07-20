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
import { retailer } from "../../../../http";
import { FcDeleteDatabase } from "react-icons/fc";
import { DeleteModal } from "../../../../components/modals";
import Button from "../../../../components/button/Button";
import { BsShopWindow } from "react-icons/bs";

export default function Retailers() {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    brands: [],
    retailers: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [page, setPage] = React.useState(0);

  const [value, setValue] = React.useState<{
    retailer_id: string;
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const navigate = useNavigate();

  const onRetailerGet = async () => {
    setLoading(true);
    try {
      const res: any = await retailer("get", { postfix: `?page=${page}` });
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err: any) {
      console.log(err);
    }
    setLoading(false);
  };

  const onRetailerDelete = async () => {
    if (value) {
      setDeleteModalShow(false);
      const { retailer_id, setDeleteLoading } = value;
      setValue(undefined);
      console.log(retailer_id);
      try {
        setDeleteLoading(true);
        const res: any = await retailer("delete", {
          params: retailer_id,
        });
        if (res.status === 200) {
          await onRetailerGet();
        }
      } catch (err: any) {
        console.log(err.response);
      }
      setDeleteLoading(false);
    }
  };

  const onDashBoard = (values: any) =>
    navigate(
      `${values.retailer_id}/retailer-dashboard/${encodeURI(
        values.retailer_name
      )}`
    );
  const onOrder = (values: any) =>
    navigate(`${values.retailer_id}/retailer-orders`);
  const onArea = (values: any) =>
    navigate(`${values.retailer_id}/retailer-areas`);
  const onWarehouse = (values: any) =>
    navigate(`${values.retailer_id}/retailer-warehouse`);
  const onRetailerEdit = (values: { [key: string]: any }) =>
    navigate(`/management/retailers/${values.retailer_id}`);

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "retailer_id",
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
            idKey="retailer_id"
            axiosFunction={retailer}
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
        Header: "Auth Code",
        accessor: "auth_code",
        extraProps: {
          columnStyle: { textAlign: "center" },
        },
      },
      {
        Header: "Retailer Name",
        accessor: "retailer_name",
      },
      {
        Header: "Action",
        Cell: (cell: any) => (
          <TableActionsCell
            cell={cell}
            onDelete={async (value, setDeleteLoading) => {
              setDeleteModalShow(true);
              setValue({
                retailer_id: value.retailer_id,
                setDeleteLoading,
              });
            }}
            onEdit={onRetailerEdit}
            onDashBoard={onDashBoard}
            onArea={onArea}
            onWarehouse={onWarehouse}
          />
        ),
      },
    ],
    []
  );

  const getData = React.useMemo(() => data.retailers, [data, page]);

  React.useEffect(() => {
    onRetailerGet();
  }, [page]);
  return (
    <AdminContainer>
      <MainContainer heading="Retailer Name">
        <div className="mb-4">
          <Button url="new" icon={<BsShopWindow size={18} />} color="dark">
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
            <FcDeleteDatabase size={100} />
            <h2 className="text-lg">Sorry Data Not Available</h2>
          </div>
        )}
      </MainContainer>
      <DeleteModal
        show={deleteModalShow}
        onClose={() => setDeleteModalShow(false)}
        onClickNo={() => setDeleteModalShow(false)}
        onClickYes={onRetailerDelete}
      />
    </AdminContainer>
  );
}
