import React from "react";
import CollapseDropDown from "../../../../../../components/common/CollapseDropDown";
import {
  DateColumnFilter,
  DateTimeFilterMethod,
} from "../../../../../../components/filter/RangeColumnFilters";
import ReactTable from "../../../../../../components/table/ReactTable";
import { DateFormate } from "../../../../../../components/Utils";
import { shopOrders } from "../../../../../../http";
import Action from "./Action";

export default function MainRetailerOrders(props: {
  retailer_id: string;
  order_status: number;
  title: string;
}) {
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    orders: [],
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
        extraProps: {
          columnStyle: { textAlign: "center" },
          align: "center",
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
        extraProps: {
          columnStyle: { textAlign: "center", width: "30rem" },
        },
        Cell: (cell: any) => <Action cell={cell} />,
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
      <ReactTable
        loading={loading}
        showMessage={data.totalItems === 0}
        columns={columns}
        data={getData}
        page={page}
        changePage={(page: number) => setPage(page)}
        totalEntries={data.totalItems}
        entriesPerPage={10}
        showPagination
      />
    </CollapseDropDown>
  );
}
