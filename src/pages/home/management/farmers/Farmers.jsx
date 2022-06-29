import { Spinner } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { SelectColumActiveDeactivateFilter } from "../../../../components/filter/SelectColumnFilter";
import { ActiveDeactivateCell, Table, TableActionsCell, } from "../../../../components/table";
import { farmers } from "../../../../http";
import { FcDeleteDatabase } from "react-icons/fc";
import { DeleteModal } from "../../../../components/modals";
export default function Farmers() {
    const [data, setData] = React.useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [deleteModalShow, setDeleteModalShow] = React.useState(false);
    const [value, setValue] = React.useState();
    const onFarmerGet = async () => {
        setLoading(true);
        try {
            const res = await farmers("get");
            if (res.status === 200) {
                setData(res.data);
            }
        }
        catch (err) {
            console.log(err.response);
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
                const res = await farmers("delete", {
                    params: customer_id,
                });
                if (res.status === 200) {
                    await onFarmerGet();
                }
            }
            catch (err) {
                console.log(err.response);
            }
            setDeleteLoading(false);
        }
    };
    const onFarmerEdit = (value) => navigate(`/management/farmers/${value.customer_id}`);
    const columns = React.useMemo(() => [
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
            Cell: (cell) => <ActiveDeactivateCell cell={cell}/>,
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
            Header: "Customer Name",
            accessor: "customer_name",
        },
        {
            Header: "Action",
            Cell: (cell) => (<TableActionsCell cell={cell} onDelete={async (value, setDeleteLoading) => {
                    setDeleteModalShow(true);
                    setValue({
                        customer_id: value.customer_id,
                        setDeleteLoading,
                    });
                }} onEdit={onFarmerEdit}/>),
        },
    ], []);
    const getData = React.useMemo(() => data, [data]);
    React.useEffect(() => {
        onFarmerGet();
    }, []);
    return (<AdminContainer>
      <MainContainer heading="Packages">
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
      <DeleteModal show={deleteModalShow} onClose={() => setDeleteModalShow(false)} onClickNo={() => setDeleteModalShow(false)} onClickYes={onFarmerDelete}/>
    </AdminContainer>);
}
