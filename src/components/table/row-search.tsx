import React from "react";
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import { useAsyncDebounce } from "react-table";

const SearchStyle = styled(OutlinedInput)(({ theme }: any) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.shadows[14] },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.neutral[500]} !important`,
  },
}));

export default function RowSearch(props: {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
}) {
  const { preGlobalFilteredRows, globalFilter, setGlobalFilter } = props;
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return <div></div>;
}
