import React from "react";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { useNavigate, useParams } from "react-router-dom";
import { subCategories } from "../../../../../http";
import {
  ActiveDeactivateCell,
  Table,
  TableActionsCell,
} from "../../../../../components/table";
import {
  SelectColumActiveDeactivateFilter,
  SelectColumnFilter,
} from "../../../../../components/filter/SelectColumnFilter";
import Image from "../../../../../components/Image/Index";
import { Spinner } from "flowbite-react";
import Button from "../../../../../components/button/Button";
import { MdOutlineAccountTree } from "react-icons/md";
import { FcDeleteDatabase } from "react-icons/fc";
import { DeleteModal } from "../../../../../components/modals";

export default function SubCategories() {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    subcategories: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [value, setValue] = React.useState<{
    category_id: string;
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const { parent_category_id, category_name } = useParams();
  const navigate = useNavigate();

  const onSubCategoriesGet = async () => {
    setLoading(true);
    try {
      const res = await subCategories("get", {
        postfix: `?page=${page}&category_id=${parent_category_id}`,
      });
      if (res?.status === 200) {
        setData(res.data);
      }
    } catch (err: any) {
      console.log(err.response);
    }
    setLoading(false);
  };

  const onSubCategoriesDelete = async () => {
    if (value) {
      setDeleteModalShow(false);
      const { category_id, setDeleteLoading } = value;
      setValue(undefined);
      try {
        setDeleteLoading(true);
        const res: any = await subCategories("delete", {
          params: category_id,
        });
        if (res.status === 200) {
          await onSubCategoriesGet();
        }
      } catch (err: any) {
        console.log(err.response);
      }
      setDeleteLoading(false);
    }
  };

  const onNew = () => navigate("new");
  const onSubCategoryEdit = (values: any) => navigate(`${values.category_id}`);

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "category_id",
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
            idKey="category_id"
            setData={setData}
            axiosFunction={subCategories}
            postfix={`&category_id=${parent_category_id}`}
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
        accessor: "image",
        extraProps: {
          columnStyle: { textAlign: "center" },
          align: "center",
        },
        Cell: (cell: any) => {
          return <Image src={`category-images/${cell.value}`} alt={""} />;
        },
      },
      {
        Header: "Category Name",
        accessor: "name",
        extraProps: {
          align: "center",
        },
        Cell: (cell: any) => {
          return <h1 className="text-md font-bold">{cell.value}</h1>;
        },
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Action",
        Cell: (cell: any) => (
          <TableActionsCell
            cell={cell}
            onDelete={async (value, setDeleteLoading) => {
              setDeleteModalShow(true);
              setValue({
                category_id: value.category_id,
                setDeleteLoading,
              });
            }}
            onEdit={onSubCategoryEdit}
          />
        ),
      },
    ],
    []
  );

  const getData = React.useMemo(() => data.subcategories, [data, page]);

  React.useEffect(() => {
    onSubCategoriesGet();
  }, [page]);

  return (
    <AdminContainer>
      <MainContainer heading={`${category_name} / Subcategories`}>
        <div className="mb-4">
          <Button
            onClick={onNew}
            icon={<MdOutlineAccountTree size={18} />}
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
            <FcDeleteDatabase size={100} />
            <h2 className="text-lg">Sorry Data Not Available</h2>
          </div>
        )}
      </MainContainer>
      <DeleteModal
        show={deleteModalShow}
        onClose={() => setDeleteModalShow(false)}
        onClickNo={() => setDeleteModalShow(false)}
        onClickYes={onSubCategoriesDelete}
      />
    </AdminContainer>
  );
}
