import React from "react";
import { ActionCellButton } from "../../../../../../components/table/cell/TableActionsCell";
import { shopProductWeightPrice } from "../../../../../../http";
import ReactTable from "../../../../../../components/table/ReactTable";

function Action(props: { cell: { [key: string]: any }; retailerId: any }) {
  const [completedGet, setCompletedGet] = React.useState(true);
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    product_prices: [],
  });
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const [show, setShow] = React.useState(false);
  const { cell } = props;

  const columns = React.useMemo(
    () => [
      {
        Header: "Weight",
        accessor: "weight",
      },
      {
        Header: "MRP",
        accessor: "mrp",
        Cell: (cell: any) => <strong>{cell.value}Rs</strong>,
      },
    ],
    []
  );

  const getData = React.useMemo(() => data.product_prices, [data, page]);

  const onGet = async () => {
    if (completedGet) {
      setLoading(true);
      try {
        const res = await shopProductWeightPrice("get", {
          postfix: `?page=${page}&sku_id=${cell.row.original.sku_id}`,
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
      <ActionCellButton
        show={show}
        onShow={(state) => {
          setShow(state);
          onGet();
        }}
      >
        Price Details
      </ActionCellButton>
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
