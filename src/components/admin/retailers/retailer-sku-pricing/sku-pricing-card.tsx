import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { LabelText } from "../styled";
import usePrintData from "../../../../hooks/usePrintData";
import { FaCheck, FaRupeeSign, FaStar } from "react-icons/fa";
import ErrorSuccessChip from "../../../common/error-success-chip";
import { MdError } from "react-icons/md";

const label1 = [
  { title: "weight", accessor: "weight" },
  { title: "MRP", accessor: "mrp" },
  { title: "price", accessor: "price" },
  { title: "Sale Price", accessor: "sale_price" },
];

const label2 = [
  { title: "SKU ID", accessor: "sku_id" },
  { title: "category", accessor: "category_name" },
  { title: "subcategory", accessor: "subcategory_name" },
  { title: "brand", accessor: "brand_name" },
  { title: "sku code", accessor: "sku_code" },
];

export default function SkuPricingCard(props: { sku: { [key: string]: any } }) {
  const { sku } = props;

  const { printData: obj1 } = usePrintData({
    labels: label1,
    data: sku,
  });
  const { printData: obj2 } = usePrintData({
    labels: label2,
    data: sku,
  });

  return (
    <Card sx={{ width: 350 }} elevation={5}>
      <CardMedia component="img" sx={{ height: 160 }} image={sku.image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {sku?.sku_name || "No Name"}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container>
              {obj2.map((item, index) => (
                <Grid key={index} item xs={12}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <LabelText>{item.get("title")}:</LabelText>
                    <Typography>{item.get("Cell")}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                {obj1.map((item, index) => (
                  <Grid key={index} item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <LabelText>{item.get("title")}:</LabelText>
                      <Typography>{item.get("Cell")}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Box display={"flex"} gap={2} flexWrap="wrap">
          <ErrorSuccessChip
            show={sku.active === 0}
            values={{
              error: "Deactive",
              success: "Active",
            }}
            icons={{
              error: <MdError />,
              success: <FaCheck size={15} />,
            }}
          />
          <Chip
            size="small"
            color={sku.focus_sku === 0 ? "error" : "warning"}
            label={sku.focus_sku === 0 ? "Off" : "On"}
            variant="outlined"
            icon={sku.focus_sku === 0 ? <MdError /> : <FaStar size={15} />}
          />
          <Chip
            icon={<FaRupeeSign size={15} />}
            label="price"
            size="small"
            variant="outlined"
            color="secondary"
          />
        </Box>
      </CardActions>
    </Card>
  );
}
