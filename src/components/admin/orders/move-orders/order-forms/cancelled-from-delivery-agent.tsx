import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { shopReason } from "../../../../../http";
import AsyncAutocomplete from "../../../../form/async-autocomplete";

export default function CancelledFromDeliveryAgent() {
  const [deliveryReasonSelect, setDeliveryReasonSelect] = React.useState<
    number | undefined
  >();

  const { isLoading, data } = useQuery(["get-all-reason-delivery"], () =>
    shopReason("get", {
      params: "delivery",
    })
  );

  const deliveryReasonOptions = React.useMemo(() => {
    if (data?.status === 200) return data.data || [];
    return [];
  }, [data]);

  return (
    <Box mt={2}>
      <Typography my={1} variant={"h6"}>
        Move order cancelled from delivery
      </Typography>
      <AsyncAutocomplete
        id="reason-delivery-option"
        label="Reason Type"
        loading={isLoading}
        options={deliveryReasonOptions}
        value={deliveryReasonSelect}
        objFilter={{
          title: "reason_name",
          value: "reason_id",
        }}
        onChangeOption={(value) => setDeliveryReasonSelect(value)}
      />
      <TextField
        label="Other Reasons"
        multiline
        rows={5}
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
