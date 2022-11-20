import React from "react";
import { Typography } from "@mui/material";
import { Cell } from "react-table";

export default function CheckDataCell(props: { cell: Cell }) {
  const {
    cell: { value },
  } = props;

  if (!value) {
    return (
      <Typography fontSize="small" color="error">
        Error No Data
      </Typography>
    );
  }
  return <Typography fontSize="small">{value}</Typography>;
}
