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
import { deliveryPartners } from "../../../../http";
import { FcDeleteDatabase } from "react-icons/fc";
import { DeleteModal } from "../../../../components/modals";
import Button from "../../../../components/button/Button";
import { TbTruckDelivery } from "react-icons/tb";

export default function DeliveryPartners() {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    brands: [],
    partners: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [value, setValue] = React.useState<{
    partner_id: string;
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const navigate = useNavigate();

  const onDeliveryPartnersGet = async () => {
    setLoading(true);
    try {
      const res: any = await deliveryPartners("get", {
        postfix: `?page=${page}`,
      });
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err: any) {
      console.log(err);
    }
    setLoading(false);
  };

  const onDeliveryPartnerDelete = async () => {
    if (value) {
      setDeleteModalShow(false);
      const { partner_id, setDeleteLoading } = value;
      setValue(undefined);
      try {
        setDeleteLoading(true);
        const res: any = await deliveryPartners("delete", {
          params: partner_id,
        });
        if (res.status === 200) {
          await onDeliveryPartnersGet();
        }
      } catch (err: any) {
        console.log(err.response);
      }
      setDeleteLoading(false);
    }
  };

  const onDeliveryPartnerEdit = (values: { [key: string]: any }) =>
    navigate(`/management/delivery-partners/${values.partner_id}`);
  const onNext = (values: { [key: string]: any }) =>
    navigate(
      `/management/delivery-partners/${
        values.partner_id
      }/dp-retailer/${decodeURI(values.partner_name)}`
    );

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "partner_id",
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
            idKey="partner_id"
            axiosFunction={deliveryPartners}
          />
        ),
      },
      {
        Header: "Partner Name",
        accessor: "partner_name",
        extraProps: {
          columnStyle: { textAlign: "center" },
        },
      },
      {
        Header: "Zone Name",
        accessor: "zone_name",
      },
      {
        Header: "Email",
        accessor: "email_id",
      },
      {
        Header: "Phone No.",
        accessor: "phone_no",
      },
      {
        Header: "Action",
        Cell: (cell: any) => (
          <TableActionsCell
            cell={cell}
            onDelete={async (value, setDeleteLoading) => {
              setDeleteModalShow(true);
              setValue({
                partner_id: value.partner_id,
                setDeleteLoading,
              });
            }}
            onEdit={onDeliveryPartnerEdit}
            onNext={onNext}
          />
        ),
      },
    ],
    []
  );

  const getData = React.useMemo(() => data.partners, [data, page]);

  React.useEffect(() => {
    onDeliveryPartnersGet();
  }, [page]);

  return (
    <AdminContainer>
      <MainContainer heading="Delivery Partners">
        <div className="mb-4">
          <Button url="new" icon={<TbTruckDelivery size={18} />} color="dark">
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
        onClickYes={onDeliveryPartnerDelete}
      />
    </AdminContainer>
  );
}
