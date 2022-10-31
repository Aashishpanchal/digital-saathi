import React from "react";
import { Button, Box } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";

function PageBreadcrumbs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onBack = () => navigate(-1);

  const backOff = React.useMemo(
    () =>
      new Set([
        "/management/categories",
        "/management/brands",
        "/management/products",
        "/management/farmers",
        "/management/retailers",
        "/management/delivery-partners",
        "/dashboard",
        "/auth0-users",
        "/masters/packages",
        "/masters/units",
        "/masters/areas",
        "/retailer-report/input-sale-details",
        "/retailer-report/cancelled-orders",
        "/retailer-report/data-sku-pricing",
        "/orders/all-orders",
        "/orders/new-orders",
        "/orders/orders-accepted",
        "/orders/orders-in-progress",
        "/orders/orders-out-for-delivery",
        "/orders/orders-delivered",
        "/orders/orders-returning",
        "/orders/orders-returned",
        "/orders/orders-cancelled",
      ]),
    []
  );

  return backOff.has(pathname) ? null : (
    <Box mx={1}>
      <Button
        variant="text"
        startIcon={<BiArrowBack size={20} />}
        color="inherit"
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onBack}
      >
        Back
      </Button>
    </Box>
  );
}

export default React.memo(PageBreadcrumbs);
