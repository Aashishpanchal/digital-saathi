import React from "react";
import { Typography } from "@mui/material";
import { Cell } from "react-table";
import { dtypeValidation } from "../../admin/utils";

export default function CheckDataCell(props: {
  cell: Cell;
  dtype: "string" | "number";
}) {
  const {
    cell: { value },
    dtype,
  } = props;

  const { error, message } = React.useMemo(
    () => dtypeValidation(value, dtype),
    [value, dtype]
  );

  if (error) {
    return (
      <Typography fontSize="small" color="error">
        {message}
      </Typography>
    );
  }
  return <Typography fontSize="small">{value}</Typography>;
}
