import React from "react";
import { PrintActionCell } from "../../../../../../components/table/cell/TableActionsCell";
import { shopOrderDetails } from "../../../../../../http";
import Image from "../../../../../../components/Image/Index";
import ReactTable from "../../../../../../components/table/ReactTable";

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
          <ReactTable
            loading={loading}
            showMessage={data.totalItems === 0}
            columns={columns}
            data={getData}
            showPagination
            page={page}
            changePage={(page: number) => setPage(page)}
            totalEntries={data.totalItems}
            totalPages={data.totalPages - 1}
            entriesPerPage={10}
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(Action);
