// material
import { Paper, Typography } from "@mui/material";
import { BsExclamationTriangle } from "react-icons/bs";


export default function RawDataNotFound() {
  return (
    <Paper sx={{ boxShadow: "none" }}>
      <Typography gutterBottom align="center" sx={{display : "flex" , justifyContent:"center" , alignItem:"center", gap :1}}  variant="h6">
        No Records Found 
        
        <BsExclamationTriangle color=" #10B981"/>
      </Typography>
      {/* <Typography variant="body2" align="center">
        Sorry, No records found?😢.
      </Typography> */}
    </Paper>
  );
}
