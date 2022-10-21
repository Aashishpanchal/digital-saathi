import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { FaWarehouse } from "react-icons/fa";

export default function TotalSku(props: { total: number }) {
  const { total } = props;
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Warehouse
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {total}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <FaWarehouse />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
