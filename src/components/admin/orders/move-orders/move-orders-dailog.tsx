import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
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
  refetch: Function;
}) {
  const { open, onClose, orderStatus, orders, refetch } = props;
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
      "0": (
        <OrderForms.NewOrder
          key={0}
          onClose={onClose}
          orders={orders}
          refetch={refetch}
        />
      ),
      "1": (
        <OrderForms.Accepted
          key={1}
          onClose={onClose}
          orders={orders}
          refetch={refetch}
        />
      ),
      "3": (
        <OrderForms.InProcess
          key={3}
          onClose={onClose}
          orders={orders}
          refetch={refetch}
        />
      ),
      "4": (
        <OrderForms.OutForDelivery
          key={4}
          onClose={onClose}
          orders={orders}
          refetch={refetch}
        />
      ),
      "5": (
        <OrderForms.Delivered
          key={5}
          onClose={onClose}
          orders={orders}
          refetch={refetch}
        />
      ),
      "6": (
        <OrderForms.Returned
          key={6}
          onClose={onClose}
          orders={orders}
          refetch={refetch}
        />
      ),
      "8": (
        <OrderForms.Returning
          key={8}
          onClose={onClose}
          orders={orders}
          refetch={refetch}
        />
      ),
      "7": (
        <OrderForms.CancelledFromFarmer
          key={7}
          onClose={onClose}
          orders={orders}
          refetch={refetch}
        />
      ),
      "9": (
        <OrderForms.CancelledFromRetailer
          key={9}
          onClose={onClose}
          orders={orders}
          refetch={refetch}
        />
      ),
      "10": (
        <OrderForms.CancelledFromAgent
          key={10}
          onClose={onClose}
          orders={orders}
          refetch={refetch}
        />
      ),
    }),
    [orders]
  );

  return (
    <Dialog open={open} fullWidth onClose={onClose}>
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
    </Dialog>
  );
}
