import { Spinner } from "flowbite-react";
import React from "react";
import { TbDatabaseOff } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import Button from "../../../../../components/button/Button";
import MainContainer from "../../../../../components/common/MainContainer";
import Image from "../../../../../components/Image/Index";
import { DeleteModal } from "../../../../../components/modals";
import {
  FocusStarCell,
  Table,
  TableActionsCell,
} from "../../../../../components/table";
import { shopProductImages } from "../../../../../http";
import useBucket from "../../../../../hooks/useBucket";

export default function ShopProductMoreImages() {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    product_images: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [value, setValue] = React.useState<{
    image: { [key: string]: any };
    setInnerLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }>();
  const [page, setPage] = React.useState(0);
  const { S3DeleteImage } = useBucket();

  const navigate = useNavigate();
  const { sku_id, sku_name } = useParams();

  const onProductImagesGet = async () => {
    setLoading(true);
    try {
      const res = await shopProductImages("get", {
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

  const onProductImageDelete = async () => {
    if (value) {
      setDeleteModalShow(false);
      const { image, setInnerLoading } = value;
      setValue(undefined);
      setInnerLoading(true);
      const metaData = await S3DeleteImage(image.image);
      if (metaData?.success) {
        try {
          const res: any = await shopProductImages("delete", {
            params: image.image_id,
          });
          if (res.status === 200) {
            await onProductImagesGet();
          }
        } catch (err: any) {
          console.log(err.response);
        }
      }
      setInnerLoading(false);
    }
  };

  const onUpload = () => navigate("upload");
  const onProductImageEdit = (value: { [key: string]: any }) =>
    navigate(`${value.image_id}`);

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "image_id",
        extraProps: {
          columnStyle: {
            width: "0px",
            textAlign: "center",
            paddingRight: "0px",
          },
        },
      },
      {
        Header: "Title",
        accessor: "title",
        extraProps: {
          columnStyle: { textAlign: "center" },
        },
      },
      {
        Header: "Product Image",
        accessor: "image",
        extraProps: {
          columnStyle: { textAlign: "center" },
        },
        Cell: (cell: any) => {
          return <Image url={cell.value} alt={""} />;
        },
      },
      {
        Header: "Focus SKU",
        accessor: "focus_sku",
        Cell: (cell: any) => (
          <FocusStarCell
            cell={cell}
            idKey="image_id"
            payload={["sku_id", "image"]}
            axiosFunction={shopProductImages}
            postfix={`?page=${page}&sku_id=${sku_id}`}
            setData={setData}
          />
        ),
      },
      {
        Header: "Action",
        Cell: (cell: any) => (
          <TableActionsCell
            cell={cell}
            onDelete={async (values, setDeleteLoading) => {
              setDeleteModalShow(true);
              setValue({
                image: values,
                setInnerLoading: setDeleteLoading,
              });
            }}
            onEdit={onProductImageEdit}
          />
        ),
      },
    ],
    [data, page]
  );

  const getData = React.useMemo(() => data.product_images, [data, page]);

  React.useEffect(() => {
    onProductImagesGet();
  }, [page]);

  return (
    <AdminContainer>
      <MainContainer heading={`${sku_name} / Price`}>
        <div className="mb-4">
          <Button
            onClick={onUpload}
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
        onClickYes={onProductImageDelete}
      />
    </AdminContainer>
  );
}
