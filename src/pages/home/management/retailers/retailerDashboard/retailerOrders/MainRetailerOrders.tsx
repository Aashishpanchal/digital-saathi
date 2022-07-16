import { Spinner } from "flowbite-react";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import CollapseDropDown from "../../../../../../components/common/CollapseDropDown";
import {
  DateColumnFilter,
  DateTimeFilterMethod,
} from "../../../../../../components/filter/RangeColumnFilters";
import { Table } from "../../../../../../components/table";
import { PrintActionCell } from "../../../../../../components/table/cell/TableActionsCell";
import { DateFormate } from "../../../../../../components/Utils";
import { shopOrders } from "../../../../../../http";

export default function MainRetailerOrders(props: {
  retailer_id: string;
  order_status: number;
  title: string;
}) {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    orders: [],
    retailers: [],
  });
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const onGet = async () => {
    setLoading(true);
    try {
      const res = await shopOrders("get", {
        postfix: `?page=${page}&order_status=${props.order_status}&retailer_id=${props.retailer_id}`,
      });
      if (res?.status === 200) {
        // formatting date time column
        const rowData = res.data;
        if (rowData.orders) {
          for (let i = 0; i < rowData.orders.length; i++) {
            rowData.orders[i].order_date = DateFormate(
              rowData.orders[i]?.order_date
            );
          }
        }
        setData(rowData);
      }
    } catch (err: any) {
      console.log(err.response);
    }
    setLoading(false);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "order_id",
        extraProps: {
          columnStyle: {
            width: "0px",
            textAlign: "center",
            paddingRight: "0px",
          },
        },
      },
      {
        Header: "Order Date",
        accessor: "order_date",
        id: "order_date",
        extraProps: {
          columnStyle: { textAlign: "center" },
        },
        filter: DateTimeFilterMethod, // filter add datetime
        Filter: DateColumnFilter, // filter input add datetime
      },
      {
        Header: "Order Amount",
        accessor: "grand_total",
        Cell: (cell: any) => <div className="font-bold">Rs {cell.value}</div>,
      },
      {
        Header: "Farmer Details",
        accessor: "customer_id",
      },
      {
        Header: "Action",
        Cell: (cell: any) => {
          const [show, setShow] = React.useState(false);
          return (
            <div className="flex items-center justify-center">
              <PrintActionCell
                printUrl={`/orders/order-invoice-print/${cell.row.original.order_id}`}
                onShow={() => setShow(!show)}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const getData = React.useMemo(() => data.orders, [data, page]);

  React.useEffect(() => {
    onGet();
  }, [page]);
  return (
    <CollapseDropDown title={props.title} color="green">
      {loading ? (
        <div className="flex flex-col justify-center items-center space-y-3 mt-4">
          <Spinner color="blue" size="xl" className="object-cover w-24 h-24" />
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
        <div className="flex flex-col justify-center items-center">
          <FaExclamationTriangle size={50} className="text-gray-500" />
          <span className="font-bold">No Orders Currently.</span>
        </div>
      )}
    </CollapseDropDown>
  );
}
