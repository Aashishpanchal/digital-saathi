import { Spinner } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { SelectColumActiveDeactivateFilter } from "../../../../components/filter/SelectColumnFilter";
import { ActiveDeactivateCell, Table, TableActionsCell, } from "../../../../components/table";
import { retailer } from "../../../../http";
import { FcDeleteDatabase } from "react-icons/fc";
import { DeleteModal } from "../../../../components/modals";
import Button from "../../../../components/button/Button";
import { BsShopWindow } from "react-icons/bs";
export default function Retailers() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [deleteModalShow, setDeleteModalShow] = React.useState(false);
    const [value, setValue] = React.useState();
    const navigate = useNavigate();
    const onRetailerGet = async () => {
        setLoading(true);
        try {
            const res = await retailer("get");
            if (res.status === 200) {
                setData(res.data);
            }
        }
        catch (err) {
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
                const res = await retailer("delete", {
                    params: retailer_id,
                });
                if (res.status === 200) {
                    await onRetailerGet();
                }
            }
            catch (err) {
                console.log(err.response);
            }
            setDeleteLoading(false);
        }
    };
    const onNew = () => navigate("/management/retailers/new");
    const onRetailerEdit = (values) => navigate(`/management/retailers/${values.retailer_id}`);
    const columns = React.useMemo(() => [
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
            Cell: (cell) => (<ActiveDeactivateCell cell={cell} idKey="retailer_id" axiosFunction={retailer}/>),
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
            Cell: (cell) => (<TableActionsCell cell={cell} onDelete={async (value, setDeleteLoading) => {
                    setDeleteModalShow(true);
                    setValue({
                        retailer_id: value.retailer_id,
                        setDeleteLoading,
                    });
                }} onEdit={onRetailerEdit}/>),
        },
    ], []);
    const getData = React.useMemo(() => data, [data]);
    React.useEffect(() => {
        onRetailerGet();
    }, []);
    return (<AdminContainer>
      <MainContainer heading="Retailer Name">
        <div className="mb-4">
          <Button onClick={onNew} icon={<BsShopWindow size={18}/>} color="dark">
            New
          </Button>
        </div>
        {loading ? (<div className="flex flex-col justify-center items-center space-y-3 mt-4">
            <Spinner color="blue" size="xl" className="object-cover w-24 h-24"/>
            <h2 className="dark:text-gray-100">
              Please wait fetch data from server....
            </h2>
          </div>) : data.length !== 0 ? (<Table columns={columns} data={getData}/>) : (<div className="flex flex-col space-y-4 justify-center items-center font-bold">
            <FcDeleteDatabase size={100}/>
            <h2 className="text-lg">Sorry Data Not Available</h2>
          </div>)}
      </MainContainer>
      <DeleteModal show={deleteModalShow} onClose={() => setDeleteModalShow(false)} onClickNo={() => setDeleteModalShow(false)} onClickYes={onRetailerDelete}/>
    </AdminContainer>);
}
