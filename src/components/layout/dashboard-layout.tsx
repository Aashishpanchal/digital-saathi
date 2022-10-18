import { Box } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar";
// import PageBreadcrumbs from "./page-breadcrumbs";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // const location = useLocation();
  // const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {/* {pathnames.length !== 0 && <PageBreadcrumbs pathnames={pathnames} />} */}
          <Outlet />
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        open={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}
