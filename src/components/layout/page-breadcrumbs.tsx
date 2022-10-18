import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import LinkRouter from "../../routers/LinkRouter";

const breadcrumbNameMap: { [key: string]: string } = {
  "/management/categories": "categories",
  "/management/brands": "brands",
  "/management/products": "products",
  "/management/farmers": "farmers",
  "/management/retailers": "retailers",
  "/management/delivery-partners": "delivery-partners",
};

function PageBreadcrumbs(props: { pathnames: string[] }) {
  const { pathnames } = props;
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        fontSize: "medium",
        my: 1,
        mx: 2,
      }}
    >
      <LinkRouter
        underline="none"
        color="inherit"
        to="/"
        sx={{
          transition: "color 400ms ease-in-out",
          "&:hover": {
            textShadow: "0px 0px 0.1px",
            color: "secondary.main",
          },
        }}
      >
        dashboard
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return last ? (
          <Typography color="text.primary" key={to}>
            {value}
          </Typography>
        ) : (
          <LinkRouter
            underline="none"
            color="inherit"
            to={to}
            key={to}
            sx={{
              transition: "color 400ms ease-in-out",
              "&:hover": {
                textShadow: "0px 0px 0.1px",
                color: "secondary.main",
              },
            }}
          >
            {value}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}

export default React.memo(PageBreadcrumbs);
