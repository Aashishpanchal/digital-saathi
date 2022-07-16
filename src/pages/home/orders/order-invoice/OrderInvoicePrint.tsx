import React from "react";
import { useParams } from "react-router-dom";
import { PrintInvoice } from "../../../../components/print";
import useGetData from "../../../../hooks/useGetData";
import { retailer, shopOrderDetails, shopOrders } from "../../../../http";

type ResponseType = { [key: string]: any };

export default function OrderInvoicePrint() {
  const { order_id } = useParams();

  const [retailerData, setRetailerData] = React.useState<ResponseType>({});
  const [orderData, setOrderData] = React.useState<ResponseType>({});
  const { data: orderDetailsData } = useGetData({
    axiosFunction: shopOrderDetails,
    extractKey: "order_details",
    postfix: `order_id=${order_id}`,
  });

  const retailerLabel = React.useMemo(
    () => [
      {
        Label: "Sold by",
        accessor: "company_name",
      },
      {
        Label: "Address",
        accessor: "address",
      },
      {
        Label: "GST Registration No",
        accessor: "gst_number",
      },
      {
        Label: "Pan Number",
        accessor: "pan_no",
      },
    ],
    []
  );

  const billingLabel = React.useMemo(
    () => [
      {
        Label: "Billing Address",
        accessor: "billing_address_id",
      },
    ],
    []
  );

  const shippingLabel = React.useMemo(
    () => [
      {
        Label: "Shipping Address",
        accessor: "shipping_address_id",
      },
    ],
    []
  );

  const orderLabel = React.useMemo(
    () => [
      {
        Label: "Order Number",
        accessor: "order_id",
      },
      {
        Label: "Order Date",
        accessor: "order_date",
      },
      {
        Label: "Pan No.",
        accessor: "pan_no",
      },
    ],
    []
  );

  const orderDetailCol = React.useMemo(
    () => [
      {
        Header: "Sr. No",
        accessor: "order_detail_id",
        extraProps: {
          columnStyle: {
            width: "5%",
            textAlign: "center",
          },
          align: "center",
        },
      },
      {
        Header: "Description",
        accessor: "customer_id",
        extraProps: {
          columnStyle: {
            width: "40%",
            textAlign: "center",
          },
        },
      },
      {
        Header: "Price",
        accessor: "price_id",
        extraProps: {
          align: "center",
        },
      },
      {
        Header: "Qty",
        accessor: "quantity",
        extraProps: {
          columnStyle: {
            width: "4%",
            textAlign: "center",
          },
          align: "center",
        },
      },
      {
        Header: "Net Amount",
        accessor: "",

        extraProps: {
          align: "center",
        },
      },
      {
        Header: "Tax Type",
        accessor: "igst",

        extraProps: {
          align: "center",
        },
      },
      {
        Header: "Tax Amount",
        accessor: "",

        extraProps: {
          align: "center",
        },
      },
      {
        Header: "Total Amount",
        accessor: "total_price",

        extraProps: {
          align: "center",
        },
      },
    ],
    []
  );

  const getOrderDetails = React.useMemo(
    () => orderDetailsData,
    [orderDetailsData]
  );

  const onGetOrder = async () => {
    try {
      const res = await shopOrders("get", {
        params: order_id,
      });
      if (res?.status === 200) {
        setOrderData(res.data);
      }
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const onGetRetailer = async (retailerId: number) => {
    try {
      const res = await retailer("get", {
        params: retailerId.toString(),
      });
      if (res?.status === 200) {
        setRetailerData(res.data);
      }
    } catch (error: any) {
      console.log(error.response);
    }
  };

  React.useEffect(() => {
    onGetOrder();
  }, []);

  React.useEffect(() => {
    if (typeof orderData?.retailer_id !== "undefined") {
      onGetRetailer(orderData.retailer_id);
    }
  }, [orderData]);

  return (
    <PrintInvoice.Container>
      <PrintInvoice.TableContainer>
        <PrintInvoice.TableBody>
          {/* Title Part */}
          <PrintInvoice.TableRowHeader
            invoiceNumber="00044181652780675"
            invoiceDate="2022-05-17"
          />
          {/* Order Header Part */}
          <PrintInvoice.TableRow borderColor="black" grid={true}>
            <PrintInvoice.RenderTableCell
              labels={retailerLabel}
              data={retailerData}
            />
            <PrintInvoice.RenderTableCell
              labels={billingLabel}
              data={orderData}
            />
            <PrintInvoice.RenderTableCell
              labels={shippingLabel}
              data={orderData}
            />
          </PrintInvoice.TableRow>
          {/* Order Third Part */}
          <PrintInvoice.TableRow borderColor="black" grid={true}>
            <PrintInvoice.RenderTableCell
              labels={orderLabel}
              data={orderData}
            />
          </PrintInvoice.TableRow>
          {/* Order Forth */}
          <PrintInvoice.OrderDetailTable
            columns={orderDetailCol}
            data={getOrderDetails}
          >
            <tr>
              <td></td>
              <td className="font-bold p-3">Total</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="font-bold p-3" align="center">
                {orderData?.grand_total}
              </td>
            </tr>
          </PrintInvoice.OrderDetailTable>
          {/* Order Fifth */}
          <tr className="grid grid-cols-1 py-2 border-2 text-xs">
            <td>
              <span className="font-bold">
                Amount in Words- one thousand six hundred and sixty Rupees{" "}
              </span>
            </td>
          </tr>
        </PrintInvoice.TableBody>
      </PrintInvoice.TableContainer>
    </PrintInvoice.Container>
  );
}
