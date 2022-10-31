import React from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { FaSave as SaveIcon } from "react-icons/fa";
import { AiFillPrinter as PrintIcon } from "react-icons/ai";
import { MainContainer } from "../../../components/layout";
import { shopOrders } from "../../../http";
import { Container, Box, Grid } from "@mui/material";
import OrderDetailCard from "../../../components/admin/orders/order-detail-card";
import dayjs from "dayjs";
import { reactToPdf } from "../../../components/admin/utils";
import CommonToolbar from "../../../components/admin/common-toolbar";
import OrderDetailsList from "../../../components/admin/orders/order-detail-list";
import { useQuery } from "@tanstack/react-query";
import SpeedDialTooltipAction from "../../../components/admin/speed-dial-tooltip-action";

const orderLabel = [
  { label: "Order ID", accessor: "order_id" },
  {
    label: "Order Date",
    accessor: "order_date",
    Cell: (cell: any) => <>{dayjs(cell.value).format("MMMM D, YYYY")}</>,
  },
];

const retailerLabel = [
  { label: "Retailer Name", accessor: "retailer_name" },
  { label: "Mobile", accessor: "retailer_phone_no" },
  { label: "Email", accessor: "retailer_email_id" },
];

const customerLabel = [
  { label: "Customer Name", accessor: "customer_name" },
  { label: "Mobile", accessor: "customer_phone_no" },
  { label: "Email", accessor: "customer_email_id" },
];

const partnerLabel = [
  { label: "Partner Name", accessor: "partner_name" },
  { label: "Mobile", accessor: "partner_phone_no" },
  { label: "Email", accessor: "partner_email_id" },
];

const billingLabel = [
  { label: "Name", accessor: "billing_name" },
  { label: "Village", accessor: "billing_village" },
  { label: "District", accessor: "billing_district" },
  { label: "Sub District", accessor: "billing_sub_district" },
  { label: "State", accessor: "billing_state" },
  { label: "Pincode", accessor: "billing_pincode" },
];

const shippingLabel = [
  { label: "Name", accessor: "shipping_name" },
  { label: "Village", accessor: "shipping_village" },
  { label: "District", accessor: "shipping_district" },
  { label: "Sub District", accessor: "shipping_sub_district" },
  { label: "State", accessor: "shipping_state" },
  { label: "Pincode", accessor: "shipping_pincode" },
];

const collectionLabel = [
  { title: "View Order", labelObj: orderLabel },
  { title: "Retailer", labelObj: retailerLabel },
  { title: "Deliver Partner", labelObj: partnerLabel },
  { title: "Customer", labelObj: customerLabel },
  { title: "Billing", labelObj: billingLabel },
  { title: "Shipping", labelObj: shippingLabel },
];

export default function OrderDetails() {
  const { order_id } = useParams();
  let componentRef = React.useRef<any>(null);

  const { data } = useQuery([`order-orderDetail-${order_id}`], () =>
    shopOrders("get", { params: order_id })
  );

  const order = React.useMemo(() => {
    if (data?.status === 200) return data.data?.orders[0];
    return {};
  }, [data]);

  const pageStyle = `
  @media all {
    .page-break {
      display: none;
    }
  }
  
  @media print {
    html, body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }
    body {
      -webkit-filter: grayscale(100%);
      -moz-filter: grayscale(100%);
      -ms-filter: grayscale(100%);
      filter: grayscale(100%);
    }
  }
  
  @media print {
    .page-break {
      margin-top: 1rem;
      display: block;
      page-break-before: auto;
    }
  }
  
  @page {
    size: auto;
    margin: 3mm;
    margin-top: 15mm;
  }
`;

  const onPrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageStyle,
  });

  const actions = React.useMemo(
    () => [
      {
        icon: <SaveIcon size={20} />,
        name: "Save",
        onClick: () =>
          reactToPdf(componentRef.current, "order-details-pdf.pdf"),
      },
      { icon: <PrintIcon size={20} />, name: "Print", onClick: onPrint },
    ],
    []
  );

  return (
    <>
      <MainContainer>
        <Container>
          <CommonToolbar title={`${order?.retailer_name} / Order Details`} />
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            component="div"
            ref={componentRef}
          >
            <Grid container spacing={2}>
              {collectionLabel.map((item, index) => (
                <Grid key={index} item xs={6}>
                  <OrderDetailCard
                    title={item.title}
                    labels={item.labelObj}
                    data={order}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <OrderDetailsList
                  orderId={order_id as string}
                  grandTotal={order?.grand_total || 0}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </MainContainer>
      <SpeedDialTooltipAction actions={actions} />
    </>
  );
}
