import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import usePrintData from "../../../../hooks/usePrintData";
import dayjs from "dayjs";
import OrdersDetailsList from "./orders-details-list";

const LabelText = styled(Typography)({
  color: "GrayText",
  fontStyle: "oblique",
});

const label1 = [
  { title: "farmer name", accessor: "customer_name" },
  { title: "farmer address", accessor: "retailer_address" },
  { title: "partner name", accessor: "partner_name" },
  { title: "partner address", accessor: "partner_address" },
];

const label2 = [
  { title: "order no", accessor: "order_id" },
  {
    title: "order date",
    accessor: "order_date",
    Cell: (cell: any) => (
      <Typography>{dayjs(cell.value).format("MMMM D, YYYY")}</Typography>
    ),
  },
  { title: "order amount", accessor: "grand_total" },
];

export default function OrderCard(props: { order?: { [key: string]: any } }) {
  const { order } = props;

  const [orderDetailShow, setOderDetailShow] = React.useState(false);

  const { printData: obj1 } = usePrintData({
    labels: label2,
    data: order,
  });
  const { printData: obj2 } = usePrintData({
    labels: label1,
    data: order,
  });

  return (
    <Card elevation={4}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item sm={12} lg={8}>
            <Grid container spacing={1} justifyContent="space-between">
              {obj1.map((item, index) => (
                <Grid key={index} item lg={4}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <LabelText>{item.get("title")}:</LabelText>
                    {item.get("Cell")}
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Grid item>
              {obj2.map((item, index) => (
                <Grid key={index} item lg={12}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <LabelText>{item.get("title")}:</LabelText>
                    <Typography>{item.get("Cell")}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item sm={12} lg={4}>
            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                onClick={() => setOderDetailShow(!orderDetailShow)}
              >
                View
              </Button>
              <Button variant="outlined" size="small" color="secondary">
                Print
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Collapse in={orderDetailShow}>
          <OrdersDetailsList orderId={order?.order_id} />
        </Collapse>
      </CardContent>
    </Card>
  );
}
