import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { shopReason } from "../../../../../http";
import AsyncAutocomplete from "../../../../form/async-autocomplete";

export default function CancelledFromRetailer() {
  const [retailerReasonSelect, setRetailerReasonSelect] = React.useState<
    number | undefined
  >();

  const { isLoading, data } = useQuery(["get-all-reason-retailer"], () =>
    shopReason("get", {
      params: "retailer",
    })
  );

  const retailerReasonOptions = React.useMemo(() => {
    if (data?.status === 200) return data.data || [];
    return [];
  }, [data]);

  return (
    <Box mt={2}>
      <Typography my={1} variant={"h6"}>
        Move order cancelled from retailer
      </Typography>
      <AsyncAutocomplete
        id="reason-retailer-option"
        label="Reason Type"
        loading={isLoading}
        options={retailerReasonOptions}
        value={retailerReasonSelect}
        objFilter={{
          title: "reason_name",
          value: "reason_id",
        }}
        onChangeOption={(value) => setRetailerReasonSelect(value)}
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
