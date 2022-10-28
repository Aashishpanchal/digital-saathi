import React from "react";
import { FaPrint } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { MainContainer } from "../../../components/layout";
import { shopOrderDetails, shopOrders } from "../../../http";
import { Typography, Container, Box, Button, Grid } from "@mui/material";
import OrderDetailCard from "../../../components/admin/orders/order-detail-card";
import ProductAvatar from "../../../components/Image/product-avatar";
import DataTable from "../../../components/table/data-table";
import dayjs from "dayjs";

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
  const [orderData, setOrderData] = React.useState([]);
  const [orderDetailData, setOrderDetailData] = React.useState<
    Array<{ [key: string]: any }>
  >([{}]);
  let componentRef = React.useRef<any>(null);

  const columns = React.useMemo(
    () => [
      {
        Header: "Product",
        accessor: "sku_image",
        // width: "5%",
        Cell: (cell: any) => (
          <Box display="flex" justifyContent={"center"}>
            <ProductAvatar src={cell.value} sx={{ width: 50, height: 50 }} />
          </Box>
        ),
      },
      {
        Header: "Name",
        accessor: "sku_name",
        // width: "5%",
      },
      {
        Header: "Dimension",
        accessor: "dimension",
        // width: "5%",
      },
      {
        Header: "Weight",
        accessor: "weight",
        // width: "5%",
      },
      {
        Header: "Price Sub Total",
        accessor: "price",
        // width: "5%",
        Cell: (cell: any) => (
          <Box display={"flex"} justifyContent="center" alignItems={"center"}>
            <Typography color="text.secondary">
              ₹{cell.value} <br /> ₹{cell.row.original?.total_price}
            </Typography>
          </Box>
        ),
      },
    ],
    []
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
    try {
      return orderDetailData.reduce((p, c) => {
        const i = isNaN(Number(p.total_price)) ? 0 : Number(p.total_price);
        const j = isNaN(Number(c.total_price)) ? 0 : Number(c.total_price);
        return {
          c,
          total_price: i + j,
        };
      });
    } catch (error) {
      return [];
    }
  }, [orderDetailData]);

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
    margin: 20mm;
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
    <MainContainer>
      <Container>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            my: 1,
          }}
        >
          <Typography variant="h5">Order Details</Typography>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<FaPrint />}
            onClick={onPrint}
          >
            Print
          </Button>
        </Box>
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
                  data={orderData}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <DataTable
                columns={columns}
                data={orderDetailData}
                showNotFound={orderDetailData.length === 0}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign={"justify"}
                  mx={1}
                >
                  <strong>Amount Payable: </strong>₹{totalPrice?.total_price}
                </Typography>
              </DataTable>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MainContainer>
  );
}
