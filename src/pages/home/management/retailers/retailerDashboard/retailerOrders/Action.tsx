import React from "react";
import { Spinner } from "flowbite-react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Table } from "../../../../../../components/table";
import { PrintActionCell } from "../../../../../../components/table/cell/TableActionsCell";
import { shopOrderDetails } from "../../../../../../http";
import Image from "../../../../../../components/Image/Index";

function Action(props: { cell: { [key: string]: any } }) {
  const [completedGet, setCompletedGet] = React.useState(true);
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    order_details: [],
  });
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const [show, setShow] = React.useState(false);
  const { cell } = props;

  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        accessor: "sku_image",
        Cell: (cell: any) => {
          return <Image url={cell.value} alt={"Order Image"} />;
        },
      },
      {
        Header: "SKU Name",
        accessor: "sku_name",
      },
      {
        Header: "Dimension",
        accessor: "dimension",
      },
      {
        Header: "Qty",
        accessor: "quantity",
      },
      {
        Header: "Weight",
        accessor: "weight",
      },
      {
        Header: "Unit Price Sub Total",
        accessor: "total_price",
        Cell: (cell: any) => (
          <span>
            <strong>Rs</strong>
            {cell.value}
          </span>
        ),
      },
    ],
    []
  );

  const getData = React.useMemo(() => data.order_details, [data, page]);

  const onGet = async () => {
    if (completedGet) {
      setLoading(true);
      try {
        const res = await shopOrderDetails("get", {
          postfix: `?page=${page}&order_id=${cell.row.original.order_id}`,
        });
        if (res?.status === 200) {
          setData(res.data);
          setCompletedGet(false);
        }
      } catch (err: any) {
        console.log(err.response);
      }
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col space-y-2 items-center justify-center"
      style={{ width: "30rem" }}
    >
      <PrintActionCell
        printUrl={`/orders/order-invoice-print/${cell.row.original.order_id}`}
        show={show}
        onShow={(state) => {
          setShow(state);
          onGet();
        }}
      />
      {show && (
        <div className="h-3/4 overflow-auto w-full shadow p-2 rounded-lg">
          {loading ? (
            <div className="flex flex-col justify-center items-center space-y-3 mt-4">
              <Spinner
                color="green"
                size="xl"
                className="object-cover w-24 h-24"
              />
              <h2 className="dark:text-gray-100">Sorry Data Not Available</h2>
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
            <div className="flex flex-col justify-center items-center">
              <FaExclamationTriangle size={50} className="text-gray-500" />
              <span className="font-bold">No Orders Currently.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(Action);
