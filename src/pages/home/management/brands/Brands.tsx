import React from "react";
import { Spinner } from "flowbite-react";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { brands } from "../../../../http";
import { useNavigate } from "react-router-dom";
import Image from "../../../../components/Image/Index";
import { DeleteModal } from "../../../../components/modals";
import {
  ActiveDeactivateCell,
  Table,
  TableActionsCell,
} from "../../../../components/table";
import { SelectColumActiveDeactivateFilter } from "../../../../components/filter/SelectColumnFilter";
import Button from "../../../../components/button/Button";
import { TbBrandSublimeText, TbDatabaseOff } from "react-icons/tb";
import useBucket from "../../../../hooks/useBucket";

export default function Brands() {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    brands: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [value, setValue] = React.useState<{
    brand: { [key: string]: any };
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }>();
  const [page, setPage] = React.useState(0);

  const navigate = useNavigate();
  const { S3DeleteImage } = useBucket();

  const onBrandsGet = async () => {
    setLoading(true);
    try {
      const res: any = await brands("get", { postfix: `?page=${page}` });
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err: any) {
      console.log(err);
    }
    setLoading(false);
  };

  const onBrandDelete = async () => {
    if (value) {
      setDeleteModalShow(false);
      const { brand, setDeleteLoading } = value;
      setValue(undefined);
      setDeleteLoading(true);
      const metaData = await S3DeleteImage(brand.brand_image);
      if (metaData?.success) {
        try {
          const res: any = await brands("delete", {
            params: brand.brand_id,
          });
          if (res.status === 200) {
            await onBrandsGet();
          }
        } catch (err: any) {
          console.log(err.response);
        }
      }

      setDeleteLoading(false);
    }
  };

  const onNew = () => navigate("/management/brands/new");
  const onBrandEdit = (value: { [key: string]: any }) =>
    navigate(`/management/brands/${value.brand_id}`);

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "brand_id",
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
            idKey="brand_id"
            axiosFunction={brands}
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
        Header: "Image",
        accessor: "brand_image",
        extraProps: {
          columnStyle: { textAlign: "center" },
          align: "center",
        },
        Cell: (cell: any) => {
          return <Image url={cell.value} alt={""} />;
        },
      },
      {
        Header: "Brand Name",
        accessor: "brand_name",
        extraProps: {
          align: "center",
        },
        Cell: (cell: any) => {
          return <h1 className="text-md font-bold">{cell.value}</h1>;
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
                brand: value,
                setDeleteLoading,
              });
            }}
            onEdit={onBrandEdit}
          />
        ),
      },
    ],
    []
  );

  const getData = React.useMemo(() => data.brands, [data, page]);

  React.useEffect(() => {
    onBrandsGet();
  }, [page]);
  return (
    <AdminContainer>
      <MainContainer heading="Brands">
        <div className="mb-4">
          <Button
            onClick={onNew}
            icon={<TbBrandSublimeText size={18} />}
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
        onClickYes={onBrandDelete}
      />
    </AdminContainer>
  );
}
