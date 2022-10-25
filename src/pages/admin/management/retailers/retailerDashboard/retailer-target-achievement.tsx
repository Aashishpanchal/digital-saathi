import React from "react";
import { MainContainer } from "../../../../../components/layout";
import { Box } from "@mui/material";
import OrdersToolbar from "../../../../../components/admin/orders/orders-toolbar";
import ComingSoonPage from "../../../../../components/ComingSoonPage";

export default function RetailerTargetAchievement() {
  return (
    <MainContainer>
      <OrdersToolbar>Target Achievement</OrdersToolbar>
      <Box sx={{ mt: 3 }}>
        <ComingSoonPage />
      </Box>
    </MainContainer>
  );
}
