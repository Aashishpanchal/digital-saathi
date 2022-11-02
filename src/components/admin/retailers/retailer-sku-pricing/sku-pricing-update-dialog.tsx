import React from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { shopRetailerProductPrice } from "../../../../http";
import { TextInput } from "../../../form";
import { NumericFormat } from "react-number-format";
import { skuPricingSchema } from "./schemas";

export default function SkuPricingUpdateDialog(props: {
  open: boolean;
  close: () => void;
  skuPrice: Record<string, any>;
  reload: () => void;
}) {
  const { open, close, skuPrice, reload } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        sale_price: skuPrice.sale_price || 0,
      },
      validationSchema: skuPricingSchema,
      enableReinitialize: true,
      async onSubmit(values) {
        if (Number(values.sale_price) <= skuPrice.mrp) {
          try {
            setLoading(true);
            const res = await shopRetailerProductPrice("put", {
              params: skuPrice.product_price_id,
              data: JSON.stringify({
                sale_price:
                  typeof values.sale_price === "string"
                    ? Number(values.sale_price)
                    : values.sale_price,
                retailer_id: skuPrice.retailer_id,
                sku_id: skuPrice.sku_id,
                price_id: skuPrice.price_id,
              }),
            });
            if (res?.status === 200) {
              close();
              reload();
              setTimeout(() => {
                enqueueSnackbar("SKU Price Update successfully!👍😊", {
                  variant: "success",
                });
              }, 200);
            }
          } catch (error) {
            console.log(error);
            enqueueSnackbar("SKU Price Update Failed!😢", {
              variant: "error",
            });
          }
          setLoading(false);
        } else {
          enqueueSnackbar(`SKU Sale Price not above MRP ₹${skuPrice.mrp}`, {
            variant: "error",
          });
        }
      },
    });

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>SKU Price Edit</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <NumericFormat
            value={values.sale_price}
            customInput={TextInput}
            label="Sale Price"
            name="sale_price"
            onChange={handleChange}
            error={errors.sale_price && touched.sale_price ? true : false}
            helperText={touched.sale_price ? (errors.sale_price as string) : ""}
            onBlur={handleBlur}
          />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexFlow: "row-reverse",
            }}
          >
            <Button
              disabled={loading}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Update
            </Button>
            <Button
              disabled={loading}
              color="secondary"
              variant="outlined"
              onClick={close}
            >
              Close
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
