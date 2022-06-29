import React from "react";
import { Spinner } from "flowbite-react";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { categories } from "../../../../http";
import { useNavigate } from "react-router-dom";
import Image from "../../../../components/Image/Index";
import { FcDeleteDatabase } from "react-icons/fc";
import { DeleteModal } from "../../../../components/modals";
import { ActiveDeactivateCell, Table, TableActionsCell, } from "../../../../components/table";
import { SelectColumActiveDeactivateFilter, SelectColumnFilter, } from "../../../../components/filter/SelectColumnFilter";
import Button from "../../../../components/button/Button";
import { MdOutlineAccountTree } from "react-icons/md";
export default function Categories() {
    const [data, setData] = React.useState({
        totalItems: 0,
        totalPages: 1,
        categories: [],
    });
    const [loading, setLoading] = React.useState(true);
    const [deleteModalShow, setDeleteModalShow] = React.useState(false);
    const [value, setValue] = React.useState();
    const [page, setPage] = React.useState(0);
    const navigate = useNavigate();
    const onCategoriesGet = async () => {
        setLoading(true);
        try {
            const res = await categories("get", { postfix: `?page=${page}` });
            if (res?.status === 200) {
                setData(res.data);
            }
        }
        catch (err) {
            console.log(err.response);
        }
        setLoading(false);
    };
    const onCategoryDelete = async () => {
        if (value) {
            setDeleteModalShow(false);
            const { category_id, setDeleteLoading } = value;
            setValue(undefined);
            try {
                setDeleteLoading(true);
                const res = await categories("delete", {
                    params: category_id,
                });
                if (res.status === 200) {
                    await onCategoriesGet();
                }
            }
            catch (err) {
                console.log(err.response);
            }
            setDeleteLoading(false);
        }
    };
    const onNew = () => navigate("new");
    const onCategoryEdit = (value) => navigate(`${value.category_id}`);
    const onNext = (values) => {
        navigate(`${values.category_id}/sub-categories/${decodeURI(values.name)}`);
    };
    const columns = React.useMemo(() => [
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
            Cell: (cell) => (<ActiveDeactivateCell cell={cell} idKey="category_id" setData={setData} axiosFunction={categories}/>),
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
            Cell: (cell) => {
                return <Image src={`category-images/${cell.value}`} alt={""}/>;
            },
        },
        {
            Header: "Category Name",
            accessor: "name",
            extraProps: {
                align: "center",
            },
            Cell: (cell) => {
                return <h1 className="text-md font-bold">{cell.value}</h1>;
            },
            Filter: SelectColumnFilter,
            filter: "includes",
        },
        {
            Header: "Action",
            Cell: (cell) => (<TableActionsCell cell={cell} onDelete={async (value, setDeleteLoading) => {
                    setDeleteModalShow(true);
                    setValue({
                        category_id: value.category_id,
                        setDeleteLoading,
                    });
                }} onEdit={onCategoryEdit} onNext={onNext}/>),
        },
    ], []);
    const getData = React.useMemo(() => data.categories, [data, page]);
    React.useEffect(() => {
        onCategoriesGet();
    }, [page]);
    return (<AdminContainer>
      <MainContainer heading="Categories">
        <div className="mb-4">
          <Button onClick={onNew} icon={<MdOutlineAccountTree size={18}/>} color="dark">
            New
          </Button>
        </div>
        {loading ? (<div className="flex flex-col justify-center items-center space-y-3 mt-4">
            <Spinner color="blue" size="xl" className="object-cover w-24 h-24"/>
            <h2 className="dark:text-gray-100">
              Please wait fetch data from server....
            </h2>
          </div>) : data ? (<Table columns={columns} data={getData} showPagination page={page} changePage={(page) => setPage(page)} totalEntries={data.totalItems} totalPages={data.totalPages - 1} entriesPerPage={10}/>) : (<div className="flex flex-col space-y-4 justify-center items-center font-bold">
            <FcDeleteDatabase size={100}/>
            <h2 className="text-lg">Sorry Data Not Available</h2>
          </div>)}
      </MainContainer>
      <DeleteModal show={deleteModalShow} onClose={() => setDeleteModalShow(false)} onClickNo={() => setDeleteModalShow(false)} onClickYes={onCategoryDelete}/>
    </AdminContainer>);
}
