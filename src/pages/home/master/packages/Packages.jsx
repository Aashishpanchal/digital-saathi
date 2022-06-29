import React from "react";
import { Spinner } from "flowbite-react";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { shopPackages } from "../../../../http";
import { useNavigate } from "react-router-dom";
import { FcDeleteDatabase } from "react-icons/fc";
import { DeleteModal } from "../../../../components/modals";
import { ActiveDeactivateCell, Table, TableActionsCell, } from "../../../../components/table";
import { SelectColumActiveDeactivateFilter } from "../../../../components/filter/SelectColumnFilter";
import Button from "../../../../components/button/Button";
import { RiShoppingBag3Fill } from "react-icons/ri";
export default function Packages() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [deleteModalShow, setDeleteModalShow] = React.useState(false);
    const [value, setValue] = React.useState();
    const navigate = useNavigate();
    const onShopPackagesGet = async () => {
        setLoading(true);
        try {
            const res = await shopPackages("get");
            if (res.status === 200) {
                setData(res.data);
            }
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false);
    };
    const onShopPackagesDelete = async () => {
        if (value) {
            setDeleteModalShow(false);
            const { package_id, setDeleteLoading } = value;
            setValue(undefined);
            try {
                setDeleteLoading(true);
                const res = await shopPackages("delete", {
                    params: package_id,
                });
                if (res.status === 200) {
                    await onShopPackagesGet();
                }
            }
            catch (err) {
                console.log(err.response);
            }
            setDeleteLoading(false);
        }
    };
    const onNew = () => navigate("/masters/packages/new");
    const onShopPackagesEdit = (values) => navigate(`/masters/packages/${values.package_id}`);
    const onActivate = async (value, setActiveLoading) => {
        const { package_id, active } = value;
        const isActive = active === 1 ? 0 : 1;
        try {
            setActiveLoading(true);
            const res = await shopPackages("put", {
                params: package_id,
                data: JSON.stringify({
                    package: value.package,
                    active: isActive,
                }),
            });
            if (res?.status === 200) {
                await onShopPackagesGet();
            }
        }
        catch (err) {
            console.log(err.response);
        }
        setActiveLoading(false);
    };
    const columns = React.useMemo(() => [
        {
            Header: "S No.",
            accessor: "package_id",
            extraProps: {
                columnStyle: {
                    width: "150px",
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
            Cell: (cell) => (<ActiveDeactivateCell cell={cell} onClick={onActivate}/>),
            extraProps: {
                columnStyle: {
                    maxWidth: "250px",
                    textAlign: "center",
                    paddingRight: "0px",
                },
                align: "center",
            },
        },
        {
            Header: "Packages",
            accessor: "package",
            extraProps: {
                align: "center",
            },
            Cell: (cell) => <span className="font-bold">{cell.value}</span>,
        },
        {
            Header: "Action",
            Cell: (cell) => (<TableActionsCell cell={cell} onDelete={async (value, setDeleteLoading) => {
                    setDeleteModalShow(true);
                    setValue({
                        package_id: value.package_id,
                        setDeleteLoading,
                    });
                }} onEdit={onShopPackagesEdit}/>),
        },
    ], []);
    const getData = React.useMemo(() => data, [data]);
    React.useEffect(() => {
        onShopPackagesGet();
    }, []);
    return (<AdminContainer>
      <MainContainer heading="Packages">
        <div className="mb-4">
          <Button onClick={onNew} icon={<RiShoppingBag3Fill size={18}/>} color="dark">
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
      <DeleteModal show={deleteModalShow} onClose={() => setDeleteModalShow(false)} onClickNo={() => setDeleteModalShow(false)} onClickYes={onShopPackagesDelete}/>
    </AdminContainer>);
}
