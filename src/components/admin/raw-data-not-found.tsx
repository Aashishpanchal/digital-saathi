// material
import { Paper, Typography } from "@mui/material";

export default function RawDataNotFound() {
  return (
    <Paper sx={{ boxShadow: "none" }}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        Sorry, No records found?😢.
      </Typography>
    </Paper>
  );
}
