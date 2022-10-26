import Box from "@mui/material/Box/Box";
import Auth0List from "../../../components/admin/auth0/auth0-list";
import { MainContainer } from "../../../components/layout";
import Typography from "@mui/material/Typography";

export default function Auth0Users() {
  return (
    <MainContainer>
      <Typography variant="h5">Users</Typography>
      <Box sx={{ mt: 1 }}>
        <Auth0List searchText={""} />
      </Box>
    </MainContainer>
  );
}
