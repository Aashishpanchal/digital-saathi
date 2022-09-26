import React from "react";
import { FaCartPlus, FaPrint } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import AdminContainer from "../../../components/AdminContainer";
import Button from "../../../components/button/Button";
import MainContainer from "../../../components/common/MainContainer";
import Image from "../../../components/Image/Index";
import { PrintCard } from "../../../components/print";
import { Table } from "../../../components/table";
import { DateFormate } from "../../../components/Utils";
import { shopOrderDetails, shopOrders } from "../../../http";

export default function OrderDetails() {
  const { order_id } = useParams();
  const [orderData, setOrderData] = React.useState([]);
  const [orderDetailData, setOrderDetailData] = React.useState<
    Array<{ [key: string]: any }>
  >([{}]);
  let componentRef = React.useRef<any>(null);

  const orderLabel = React.useMemo(
    () => [
      {
        Label: "Order ID",
        accessor: "order_id",
      },
      {
        Label: "Order Date",
        accessor: "order_date",
        Cell: (value: any) => DateFormate(value, true),
      },
    ],
    [orderData]
  );

  const retailerLabel = React.useMemo(
    () => [
      {
        Label: "Name",
        accessor: "retailer_name",
      },
      {
        Label: "Mobile",
        accessor: "retailer_phone_no",
      },
      {
        Label: "Email",
        accessor: "retailer_email_id",
      },
    ],
    [orderData]
  );
  const customerLabel = React.useMemo(
    () => [
      {
        Label: "Name",
        accessor: "customer_name",
      },
      {
        Label: "Mobile",
        accessor: "customer_phone_no",
      },
      {
        Label: "Email",
        accessor: "customer_email_id",
      },
    ],
    [orderData]
  );

  const deliverPartnerLabel = React.useMemo(
    () => [
      {
        Label: "Name",
        accessor: "partner_name",
      },
      {
        Label: "Mobile",
        accessor: "partner_phone_no",
      },
      {
        Label: "Email",
        accessor: "partner_email_id",
      },
    ],
    [orderData]
  );

  const billingDetailsLabel = React.useMemo(
    () => [
      {
        Label: "Name",
        accessor: "billing_name",
      },
      {
        Label: "Village",
        accessor: "billing_village",
      },
      {
        Label: "District",
        accessor: "billing_district",
      },
      {
        Label: "Sub District",
        accessor: "billing_sub_district",
      },
      {
        Label: "State",
        accessor: "billing_state",
      },
      {
        Label: "Pincode",
        accessor: "billing_pincode",
      },
    ],
    [orderData]
  );

  const shippingDetailsLabel = React.useMemo(
    () => [
      {
        Label: "Name",
        accessor: "shipping_name",
      },
      {
        Label: "Village",
        accessor: "shipping_village",
      },
      {
        Label: "District",
        accessor: "shipping_district",
      },
      {
        Label: "Sub District",
        accessor: "shipping_sub_district",
      },
      {
        Label: "State",
        accessor: "shipping_state",
      },
      {
        Label: "Pincode",
        accessor: "bshipping_pincode",
      },
    ],
    [orderData]
  );

  const column = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "order_detail_id",
        extraProps: {
          columnStyle: {
            width: "0px",
            textAlign: "center",
            paddingRight: "0px",
          },
        },
      },
      {
        Header: "Product",
        accessor: "sku_image",
        Cell: (cell: any) => <Image url={cell.value} alt="" />,
      },
      {
        Header: "Name",
        accessor: "sku_name",
      },
      {
        Header: "Dimension",
        accessor: "dimension",
      },
      {
        Header: "Weight",
        accessor: "weight",
      },
      {
        Header: "Price Sub Total",
        accessor: "price",
        Cell: (cell: any) => (
          <div className="space-y-1 flex-col flex">
            <span>{cell.value}Rs</span>
            <span>{cell.row.original?.total_price}Rs</span>
          </div>
        ),
      },
    ],
    [orderDetailData]
  );

  const onRetrieveOrder = async () => {
    try {
      const res = await shopOrders("get", {
        params: order_id,
      });
      if (res?.status === 200) {
        setOrderData(res.data.orders[0]);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const onOrderDetails = async () => {
    try {
      const res = await shopOrderDetails("get", {
        postfix: `?order_id=${order_id}`,
      });
      if (res?.status === 200) {
        setOrderDetailData(res.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const totalPrice = React.useMemo(() => {
    return orderDetailData.reduce((p, c) => {
      const i = isNaN(Number(p.total_price)) ? 0 : Number(p.total_price);
      const j = isNaN(Number(c.total_price)) ? 0 : Number(c.total_price);
      return {
        c,
        total_price: i + j,
      };
    });
  }, [orderDetailData]);

  const pageStyle = `
  @media print {
    @page {
      size: landscape;
    }
  }
  
  @media print {
    html,
    body {
      height: initial !important;
      overflow: initial !important;
      background-color: white !important;
      -webkit-print-color-adjust: exact;
    }
  
    .page-break {
      page-break-after: avoid;
    }
  }
  
  @page {
    size: auto;
    margin: 15mm 10mm;
  }
`;

  const onPrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageStyle,
  });

  React.useEffect(() => {
    onRetrieveOrder();
    onOrderDetails();
  }, []);

  return (
    <AdminContainer>
      <MainContainer heading="Order Details">
        <div className="mb-4">
          <Button onClick={onPrint} icon={<FaPrint size={18} />} color="dark">
            Print
          </Button>
        </div>
        <div className="flex flex-col space-y-4" ref={componentRef}>
          <PrintCard.Container>
            <PrintCard.Heading
              icon={<FaCartPlus size={40} />}
              title="View Order"
            />
            <PrintCard.RenderData labels={orderLabel} data={orderData} />
          </PrintCard.Container>
          <PrintCard.Container>
            <PrintCard.Heading
              icon={<FaCartPlus size={40} />}
              title="Retailer Details"
            />
            <PrintCard.RenderData labels={retailerLabel} data={orderData} />
          </PrintCard.Container>
          <PrintCard.Container>
            <PrintCard.Heading
              icon={<FaCartPlus size={40} />}
              title="Deliver Partner Details"
            />
            <PrintCard.RenderData
              labels={deliverPartnerLabel}
              data={orderData}
            />
          </PrintCard.Container>
          <PrintCard.Container>
            <PrintCard.Heading
              icon={<FaCartPlus size={40} />}
              title="Customer Details"
            />
            <PrintCard.RenderData labels={customerLabel} data={orderData} />
          </PrintCard.Container>
          <PrintCard.Container>
            <PrintCard.Heading
              icon={<FaCartPlus size={40} />}
              title="Billing Details"
            />
            <PrintCard.RenderData
              labels={billingDetailsLabel}
              data={orderData}
            />
          </PrintCard.Container>
          <PrintCard.Container>
            <PrintCard.Heading
              icon={<FaCartPlus size={40} />}
              title="Shipping Details"
            />
            <PrintCard.RenderData
              labels={shippingDetailsLabel}
              data={orderData}
            />
          </PrintCard.Container>
          <PrintCard.Container>
            <PrintCard.Heading
              icon={<FaCartPlus size={40} />}
              title="Order Details"
            />
            <Table
              columns={column}
              data={orderDetailData}
              filterHidden
              tableRowNode={
                <tr>
                  <td
                    colSpan={6}
                    className="whitespace-nowrap px-5 py-5 border-b"
                  >
                    <strong>Amount Payable:</strong> {totalPrice?.total_price}
                    <strong>Rs</strong>
                  </td>
                </tr>
              }
            />
          </PrintCard.Container>
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
