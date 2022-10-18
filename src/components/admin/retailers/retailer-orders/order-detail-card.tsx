import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import usePrintData from "../../../../hooks/usePrintData";
import { LabelText } from "../styled";

const labels = [
  { title: "SKU Name", accessor: "sku_name" },
  { title: "Dimension", accessor: "dimension" },
  { title: "Qty", accessor: "quantity" },
  { title: "Weight", accessor: "weight" },
  { title: "Unit Price Sub Total", accessor: "total_price" },
];

function OrderDetailsCard(props: { orderDetail: { [key: string]: any } }) {
  const { orderDetail } = props;

  const { printData: obj } = usePrintData({
    labels: labels,
    data: orderDetail,
  });

  return (
    <Card
      sx={{
        display: "flex",
        width: {
          sm: 230,
          md: 230,
          lg: 340,
        },
      }}
      elevation={5}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Grid container>
            {obj.map((item, index) => (
              <Grid key={index} item lg={12}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <LabelText fontSize={"small"}>{item.get("title")}:</LabelText>
                  <Typography fontSize={"small"}>{item.get("Cell")}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ height: 180, width: 130 }}
        image={orderDetail?.sku_image}
      />
    </Card>
  );
}

export default React.memo(OrderDetailsCard);
