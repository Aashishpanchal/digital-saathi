import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ActiveDeactivateCell,
  FocusStarCell,
  Table,
} from "../../../../../../components/table";
import TableActionsCell, {
  ActionCellButton,
} from "../../../../../../components/table/cell/TableActionsCell";

function Action(props: {
  cell: { [key: string]: any };
  setData: Function;
  axiosFunction: Function;
  postfix?: string;
  params?: string;
}) {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  const { original: data } = props.cell.row;

  const columns = React.useMemo(
    () => [
      {
        Header: "Status",
        accessor: "retailer_price_active",
        Cell: (cell: any) => (
          <ActiveDeactivateCell
            cell={cell}
            // idKey="customer_id"
            // axiosFunction={farmers}
            // setData={setData}
          />
        ),
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
        Header: "Weight",
        accessor: "weight",
      },
      {
        Header: "MRP",
        accessor: "mrp",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Sale Price",
        accessor: "retailer_sale_price",
      },
      {
        Header: "Focus SKU",
        accessor: "focus_sku",
        Cell: (cell: any) => (
          <FocusStarCell
            cell={cell}
            idKey="sku_id"
            axiosFunction={
              typeof data?.sku_id !== "number" ? undefined : props.axiosFunction
            }
            setData={props.setData}
            postfix={props.postfix}
            params={props.params}
          />
        ),
      },
    ],
    []
  );

  return (
    <div
      className="flex flex-col space-y-2 items-center justify-center"
      style={{ width: "30rem" }}
    >
      <div className="flex space-x-2">
        <TableActionsCell
          cell={props.cell}
          onWeightPrice={(values) =>
            navigate(
              `/management/products/${
                values.sku_id
              }/product-weight-price/${encodeURI(values.sku_name)}`
            )
          }
        />
        <ActionCellButton show={show} onShow={(state) => setShow(state)}>
          Price Details
        </ActionCellButton>
      </div>
      {show && (
        <div className="h-3/4 overflow-auto w-full shadow p-2 rounded-lg">
          <Table
            columns={columns}
            data={[data]}
            filterHidden
            tableRowNode={
              <tr>
                <td
                  colSpan={2}
                  className="whitespace-nowrap px-5 py-5 border-b"
                >
                  Package: {data.package}
                </td>
                <td
                  colSpan={2}
                  className="whitespace-nowrap px-5 py-5 border-b"
                >
                  Unit Per Case: {data.units_per_case}
                </td>
                <td
                  colSpan={2}
                  className="whitespace-nowrap px-5 py-5 border-b"
                >
                  Dimension: {data.dimension}
                </td>
              </tr>
            }
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(Action);
