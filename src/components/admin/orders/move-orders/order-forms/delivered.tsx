import React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useFormik } from "formik";
import moveOrdersSchemas from "../schemas";
import { shopOrders } from "../../../../../http";
import { useSnackbar } from "notistack";

export default function Delivered(props: {
  onClose: () => void;
  orders: Record<string, any>;
  refetch: Function;
}) {
  const { onClose, refetch, orders } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("cash");
  const paymentMethodList = React.useMemo(
    () => [
      // { value: "Card", title: "Card" },
      { value: "upi", title: "UPI" },
      { value: "cash", title: "Cash" },
    ],
    []
  );

  const initData = React.useMemo(
    () => ({
      cash: {
        amount_receive: 2,
        payment_to: "",
      },
      upi: {
        payment_to: "",
        amount: 0,
        upi_amount: 0,
        cash_amount: 0,
        name: "",
      },
    }),
    []
  );

  const { values, errors, touched, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initData[paymentMethod as keyof typeof initData],
      validationSchema: moveOrdersSchemas[3],
      async onSubmit(values) {
        try {
          setLoading(true);
          const res = await shopOrders("post", {
            params: "status",
            data: JSON.stringify({
              ...values,
              order_id: orders.order_id,
              order_status: 3,
            }),
          });
          if (res?.status === 200) {
            onClose();
            refetch();
            enqueueSnackbar("order move successfully!", {
              variant: "success",
            });
          }
        } catch (error) {
          console.log(error);
          enqueueSnackbar("order move failed!", {
            variant: "error",
          });
        }
        setLoading(false);
      },
    });

  return (
    <Box mt={2}>
      <Typography my={1} variant={"h6"}>
        Move order delivered
      </Typography>
      <NumericFormat
        fullWidth
        label="Amount"
        size="small"
        color="secondary"
        sx={{
          "& .MuiInputBase-input": {
            border: "none",
            "&:focus": {
              boxShadow: "none",
            },
          },
        }}
        customInput={TextField}
      />
      <FormControl fullWidth sx={{ mt: 2 }} size="small">
        <InputLabel id="demo-select-small" color="secondary">
          Move Orders
        </InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          fullWidth
          label="Move Orders"
          color="secondary"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          {paymentMethodList.map((item, index) => (
            <MenuItem
              sx={{ fontSize: "small" }}
              value={item.value.toString()}
              key={index}
            >
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="payment To"
        fullWidth
        size="small"
        color="secondary"
        sx={{
          mt: 2,
          "& .MuiInputBase-input": {
            border: "none",
            "&:focus": {
              boxShadow: "none",
            },
          },
        }}
      />
    </Box>
  );
}
