import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { shopReason } from "../../../../../http";
import AsyncAutocomplete from "../../../../form/async-autocomplete";

export default function CancelledFromFarmer() {
  const [farmerReasonSelect, setFarmerReasonSelect] = React.useState<
    number | undefined
  >();

  const { isLoading, data } = useQuery(["get-all-reason-farmer"], () =>
    shopReason("get", {
      params: "farmer",
    })
  );

  const farmerReasonOptions = React.useMemo(() => {
    if (data?.status === 200) return data.data || [];
    return [];
  }, [data]);

  return (
    <Box mt={2}>
      <Typography my={1} variant={"h6"}>
        Move order cancelled from farmer
      </Typography>
      <AsyncAutocomplete
        id="reason-farmer-option"
        label="Reason Type"
        loading={isLoading}
        options={farmerReasonOptions}
        value={farmerReasonSelect}
        objFilter={{
          title: "reason_name",
          value: "reason_id",
        }}
        onChangeOption={(value) => setFarmerReasonSelect(value)}
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
