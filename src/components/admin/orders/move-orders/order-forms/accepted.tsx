import React from "react";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { shopOrders } from "../../../../../http";

export default function Accepted(props: {
  onClose: () => void;
  orders: Record<string, any>;
  refetch: Function;
}) {
  const { onClose, orders, refetch } = props;
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onSave = async () => {
    try {
      setLoading(true);
      const res = await shopOrders("post", {
        params: "status",
        data: JSON.stringify({
          retailer_id: orders.retailer_id,
          order_id: orders.order_id,
          invoice_no: orders.suborder_no,
          order_status: 1,
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
  };

  return (
    <Box mt={2}>
      <Typography my={1} variant={"h6"}>
        Move order accepted
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row-reverse",
          gap: 2,
          my: 1,
        }}
      >
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          size="small"
          onClick={onSave}
          startIcon={
            loading ? <CircularProgress color="inherit" size={20} /> : undefined
          }
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
    </Box>
  );
}
