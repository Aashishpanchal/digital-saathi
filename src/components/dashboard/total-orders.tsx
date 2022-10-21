import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { FaTractor } from "react-icons/fa";

export default function TotalOrders(props: { total: number }) {
  const { total } = props;
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Farmers
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {total}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <FaTractor />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
