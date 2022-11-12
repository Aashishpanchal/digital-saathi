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

export default function Delivered() {
  const [paymentMethod, setPaymentMethod] = React.useState("Evalet");

  const paymentMethodList = React.useMemo(
    () => [
      { value: "Evalet", title: "Evalet" },
      { value: "Card", title: "Card" },
      { value: "Cash", title: "Cash" },
    ],
    []
  );

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
        label="Delivered To"
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
