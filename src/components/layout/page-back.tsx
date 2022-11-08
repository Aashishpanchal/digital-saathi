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
        "/management/trending-products",
        "/management/delivery-charges",
        "/dashboard",
        "/auth0-users",
        "/masters/packages",
        "/masters/units",
        "/masters/areas",
        "/masters/banner",
        "/masters/reason",
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
        "/retailer-report/data-sku-unit",
        "/retailer-report/data-sku-pricing",
        "/retailer-report/cancelled-orders",
        "/retailer-report/input-sale-details",
      ]),
    []
  );

  return backOff.has(pathname) ? null : (
    <Box my={1} mr={5} alignSelf="end">
      <Button
        variant="outlined"
        startIcon={<BiArrowBack size={20} />}
        sx={{
          p: 0,
          px: 0.5,
          borderColor: "neutral.200",
          color: "neutral.600",
          "&:hover": {
            borderColor: "neutral.300",
            color: "neutral.800",
          },
        }}
        onClick={onBack}
      >
        Back
      </Button>
    </Box>
  );
}

export default React.memo(PageBreadcrumbs);
