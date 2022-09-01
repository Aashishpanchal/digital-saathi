import { Avatar } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminContainer from "../../components/AdminContainer";
import MainContainer from "../../components/common/MainContainer";
import { SelectColumnVerifyPending } from "../../components/filter/SelectColumnFilter";
import { DeleteModal } from "../../components/modals";
import { TableActionsCell } from "../../components/table";
import ReactTable from "../../components/table/ReactTable";
import { DateFormate, textReduce } from "../../components/Utils";
import useBucket from "../../hooks/useBucket";
import { auth0Users } from "../../http";

export default function Auth0Users() {
  const [data, setData] = React.useState({
    start: 0,
    limit: 0,
    length: 0,
    users: [],
    total: 0,
  });
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [value, setValue] = React.useState<{
    user: { [key: string]: any };
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const navigate = useNavigate();
  const { S3DeleteImage } = useBucket();

  const onGetUsers = async () => {
    setLoading(true);
    try {
      const res = await auth0Users("get", {
        postfix: `?page=${page}&per_page=10&include_totals=true`,
      });
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  const onUserDelete = async () => {
    if (value) {
      setDeleteModalShow(false);
      const { user, setDeleteLoading } = value;
      setValue(undefined);
      setDeleteLoading(true);
      const metaData = await S3DeleteImage(user.picture);
      if (metaData?.success) {
        try {
          const res: any = await auth0Users("delete", {
            params: user.user_id,
          });
          if (res.status === 204) {
            await onGetUsers();
          }
        } catch (err: any) {
          console.log(err.response);
        }
      }
      setDeleteLoading(false);
    }
  };

  const onUserEdit = (values: { [key: string]: any }) =>
    navigate(`${values.user_id}`);

  const columns = React.useMemo(
    () => [
      {
        Header: "User id",
        accessor: "user_id",
        Cell: (cell: any) => <strong>{textReduce(cell.value, 25)}</strong>,
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Picture",
        accessor: "picture",
        Cell: (cell: any) => (
          <div className="flex justify-center items-center">
            <Avatar img={cell.value} size="md" rounded bordered />
          </div>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Verify/Pending",
        accessor: "email_verified",
        Filter: SelectColumnVerifyPending,
        filter: "equals",
        Cell: (cell: any) =>
          cell.value ? (
            <span className="w-fit py-1 px-1.5 rounded-full flex space-x-1 items-center bg-opacity-10 text-green-500 bg-green-500">
              verified
            </span>
          ) : (
            <span className="w-fit py-1 px-1.5 rounded-full flex space-x-1 items-center bg-opacity-10 text-red-500 bg-red-500">
              pending
            </span>
          ),
        extraProps: {
          align: "center",
        },
      },
      {
        Header: "Signed Up",
        accessor: "created_at",
        extraProps: {
          align: "center",
        },
        Cell: (cell: any) => <strong>{DateFormate(cell.value, true)}</strong>,
      },
      {
        Header: "Updated At",
        accessor: "updated_at",
        extraProps: {
          align: "center",
        },
        Cell: (cell: any) => <strong>{DateFormate(cell.value, true)}</strong>,
      },
      {
        Header: "Actions",
        Cell: (cell: any) => (
          <TableActionsCell
            cell={cell}
            onEdit={onUserEdit}
            onDelete={async (values, setDeleteLoading) => {
              setDeleteModalShow(true);
              setValue({
                user: values,
                setDeleteLoading,
              });
            }}
          />
        ),
      },
    ],
    [page]
  );

  const getData = React.useMemo(() => data.users, [data, page]);

  React.useEffect(() => {
    onGetUsers();
  }, [page]);
  return (
    <AdminContainer>
      <MainContainer heading="Users">
        <ReactTable
          loading={loading}
          showMessage={data.total === 0}
          columns={columns}
          data={getData}
          page={page}
          changePage={(page: number) => setPage(page)}
          totalEntries={data.total}
          entriesPerPage={data.length}
          showPagination
        />
        <DeleteModal
          show={deleteModalShow}
          onClose={() => setDeleteModalShow(false)}
          onClickNo={() => setDeleteModalShow(false)}
          onClickYes={onUserDelete}
        />
      </MainContainer>
    </AdminContainer>
  );
}
