import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { FaStore } from "react-icons/fa";

export default function TotalFarmerServiced(props: { total: number }) {
  const { total } = props;
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL FARMER SERVICED
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {total}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <FaStore />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
