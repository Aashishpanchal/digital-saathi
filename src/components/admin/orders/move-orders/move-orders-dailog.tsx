import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Button,
  Select,
  styled,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as OrderForms from "./order-forms";

const Option = styled(MenuItem)({
  fontSize: "small",
});

export default function MoveOrdersDialog(props: {
  orderStatus: number;
  orders: Record<string, any>;
  open: boolean;
  onClose: () => void;
}) {
  const { open, onClose, orderStatus, orders } = props;
  const [select, setSelect] = React.useState("");

  const orderStatusList = React.useMemo(
    () => [
      { title: "New", value: 0 },
      { title: "Accepted", value: 1 },
      { title: "In Process", value: 3 },
      { title: "Out for Delivery", value: 4 },
      { title: "Delivered", value: 5 },
      { title: "Returned", value: 6 },
      { title: "Cancelled from Farmer", value: 7 },
      { title: "Returning", value: 8 },
      { title: "Cancelled from Retailer", value: 9 },
      { title: "Cancelled from Delivery agent", value: 10 },
    ],
    []
  );

  const orderStatusOnForms = React.useMemo<Record<string, any>>(
    () => ({
      "0": <OrderForms.NewOrder />,
      "1": <OrderForms.Accepted />,
      "3": <OrderForms.InProcess />,
      "4": <OrderForms.OutForDelivery />,
      "5": <OrderForms.Delivered />,
      "6": <OrderForms.Returned />,
      "8": <OrderForms.Returning />,
      "7": <OrderForms.CancelledFromFarmer />,
      "9": <OrderForms.CancelledFromRetailer />,
      "10": <OrderForms.CancelledFromAgent />,
    }),
    []
  );

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Move Orders</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            width: 400,
            margin: "auto",
          }}
        >
          <FormControl fullWidth sx={{ mt: 1 }} size="small">
            <InputLabel id="demo-select-small" color="secondary">
              Move Orders
            </InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              fullWidth
              label="Move Orders"
              color="secondary"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <Option value="">
                <em>None</em>
              </Option>
              {orderStatusList.map((item, index) =>
                orderStatus !== item.value ? (
                  <Option value={item.value.toString()} key={index}>
                    {item.title}
                  </Option>
                ) : null
              )}
            </Select>
          </FormControl>
          {orderStatusOnForms[select]}
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexFlow: "row-reverse",
          }}
        >
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            size="small"
          >
            Save
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={onClose}
            size="small"
          >
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
