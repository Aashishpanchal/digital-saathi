import React from "react";
import { useMediaQuery, Divider, Drawer, Box, List } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  FaBorderAll,
  FaKey,
  FaTractor,
  FaUserPlus,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiChartPie } from "react-icons/hi";
import {
  TbBrandSublimeText,
  TbCurrencyRupee,
  TbReportAnalytics,
  TbSquareAsterisk,
  TbTruckDelivery,
  TbTruckReturn,
} from "react-icons/tb";
import {
  BsBookmarkCheckFill,
  BsFileEarmarkCheckFill,
  BsGraphUp,
  BsJournalBookmark,
  BsShopWindow,
} from "react-icons/bs";
import NavItem from "./nav-item";
import Logo from "./logo";
import {
  MdAcUnit,
  MdFreeCancellation,
  MdOutlineAccountTree,
  MdProductionQuantityLimits,
  MdSave,
} from "react-icons/md";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { VscNewFile } from "react-icons/vsc";
import { TiTicket } from "react-icons/ti";
import { FcProcess } from "react-icons/fc";
import { GiStorkDelivery } from "react-icons/gi";

export default function DashboardSidebar(props: {
  open: boolean;
  onClose: () => void;
}) {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const location = useLocation();

  React.useEffect(() => {
    if (open) {
      onClose?.();
    }
  }, [location.pathname]);

  const listDataOne = React.useMemo(
    () => [
      {
        href: "/dashboard",
        title: "Dashboard",
        icon: <HiChartPie />,
      },
      {
        href: "/auth0-users",
        title: "Auth0Users",
        icon: <FaUsers />,
      },
      {
        title: "Management",
        icon: <FaUserPlus />,
        child: [
          {
            href: "/management/categories",
            title: "Categories",
            icon: <MdOutlineAccountTree />,
          },
          {
            href: "/management/brands",
            title: "Brands",
            icon: <TbBrandSublimeText />,
          },
          {
            href: "/management/products",
            title: "Products",
            icon: <MdProductionQuantityLimits />,
          },
          {
            href: "/management/farmers",
            title: "Farmers",
            icon: <FaTractor />,
          },
          {
            href: "/management/retailers",
            title: "Retailers",
            icon: <BsShopWindow />,
          },
          {
            href: "/management/delivery-partners",
            title: "Delivery Partners",
            icon: <TbTruckDelivery />,
          },
        ],
      },
      {
        title: "Masters",
        icon: <FaUserTie />,
        child: [
          {
            href: "/masters/packages",
            title: "Packages",
            icon: <RiShoppingBag3Fill />,
          },
          {
            href: "/masters/units",
            title: "Units",
            icon: <MdAcUnit />,
          },
          {
            href: "/masters/areas",
            title: "Areas",
            icon: <MdAcUnit />,
          },
        ],
      },
      {
        title: "Report",
        icon: <TbReportAnalytics />,
        child: [
          {
            href: "/reports/amount-collection-report",
            title: "Amount collection report",
            icon: <TbCurrencyRupee />,
          },
          {
            href: "/reports/invoice-wise-delivery-status",
            title: "Invoice wise delivery status",
            icon: <MdSave />,
          },
          {
            href: "/reports/ds-margin-claims",
            title: "DS margin claims",
            icon: <BsFileEarmarkCheckFill />,
          },
          {
            href: "/reports/order-fulfillment",
            title: "Order fulfillment",
            icon: <TbTruckDelivery />,
          },
          {
            href: "/reports/sale",
            title: "Sale",
            icon: <BsGraphUp />,
          },
        ],
      },
      {
        title: "Orders",
        icon: <BsJournalBookmark />,
        child: [
          {
            title: "All Orders",
            href: "/orders/all-orders",
            icon: <FaBorderAll />,
          },
          {
            title: "New",
            href: "/orders/new-orders",
            icon: <VscNewFile />,
          },
          {
            title: "Accepted",
            href: "/orders/orders-accepted",
            icon: <TiTicket />,
          },
          {
            title: "In-Process",
            href: "/orders/orders-in-progress",
            icon: <FcProcess />,
          },
          {
            title: "Out For Delivery",
            href: "/orders/orders-out-for-delivery",
            icon: <TbTruckDelivery />,
          },
          {
            title: "Delivered",
            href: "/orders/orders-delivered",
            icon: <GiStorkDelivery />,
          },
          {
            title: "Returning",
            href: "/orders/orders-returning",
            icon: <TbTruckReturn />,
          },
          {
            title: "Returned",
            href: "/orders/orders-returned",
            icon: <BsBookmarkCheckFill />,
          },
          {
            title: "Cancelled",
            href: "/orders/orders-cancelled",
            icon: <MdFreeCancellation />,
          },
        ],
      },
    ],
    []
  );

  const listDataTwo = React.useMemo(
    () => [
      {
        href: "/change-password",
        title: "Change Password",
        icon: <FaKey />,
      },
      {
        title: "Logout",
        icon: <FiLogOut />,
      },
    ],
    []
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 1 }}>
            <Link to="/dashboard">
              <Logo />
            </Link>
          </Box>
        </div>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ flexGrow: 1 }} component="nav">
          {listDataOne.map((item, index) =>
            item.child ? (
              <NavItem
                key={index.toString()}
                icon={item.icon}
                href={item.href}
                title={item.title}
              >
                <List disablePadding>
                  {item.child.map((itemTwo, index) => (
                    <NavItem
                      key={index.toString()}
                      icon={itemTwo.icon}
                      href={itemTwo.href}
                      title={itemTwo.title}
                    />
                  ))}
                </List>
              </NavItem>
            ) : (
              <NavItem
                key={index.toString()}
                icon={item.icon}
                href={item.href}
                title={item.title}
              />
            )
          )}
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ flexGrow: 1 }}>
          {listDataTwo.map((item, index) => (
            <NavItem
              key={index.toString()}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}
