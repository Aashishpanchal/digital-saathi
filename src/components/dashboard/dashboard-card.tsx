import { Card, CardContent, Grid, Typography, Avatar } from "@mui/material";

export default function DashboardCard(props: {
  header: string;
  title: string;
  icon: React.ReactNode;
  color?: string;
}) {
  const { header, title, icon, color } = props;
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {header}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              variant="rounded"
              sx={{
                backgroundColor: color,
                height: 56,
                width: 56,
              }}
            >
              {icon}
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
