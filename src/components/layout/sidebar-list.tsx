import {
  TbBrandSublimeText,
  TbCurrencyRupee,
  TbReportAnalytics,
  TbTruckDelivery,
  TbTruckReturn,
} from "react-icons/tb";
import {
  FaBorderAll,
  FaClipboardCheck,
  FaFileAlt,
  FaRupeeSign,
  FaShippingFast,
  FaTractor,
  FaUserPlus,
  // FaUsers,
  FaUserTie,
  FaBoxes,
  FaPeopleCarry,
} from "react-icons/fa";
import {
  BsBookmarkCheckFill,
  BsFileEarmarkCheckFill,
  BsGraphUp,
  BsJournalBookmark,
  BsMailbox,
  BsShopWindow,
} from "react-icons/bs";
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
import { HiChartPie } from "react-icons/hi";
import { SiReason } from "react-icons/si";

const sideBarMainList = [
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: <HiChartPie />,
  },
  // {
  //   href: "/auth0-users",
  //   title: "Auth0 Users",
  //   icon: <FaUsers />,
  // },
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
        icon: <FaPeopleCarry />,
      },
      {
        href: "/management/trending-products",
        title: "Trending Products",
        icon: <FaBoxes />,
      },
      {
        href: "/management/delivery-charges",
        title: "Delivery Charges",
        icon: <TbTruckDelivery />,
      },
    ],
  },
  {
    title: "Master",
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
        icon: <FaBoxes />,
      },
      {
        href: "/masters/areas",
        title: "Areas",
        icon: <MdAcUnit />,
      },
      {
        href: "/masters/banner",
        title: "Banner",
        icon: <BsMailbox />,
      },
      {
        href: "/masters/reason",
        title: "Reason",
        icon: <SiReason />,
      },
    ],
  },
  {
    title: "Retailer Report",
    icon: <FaFileAlt />,
    child: [
      {
        href: "/retailer-report/input-sale-details",
        title: "Input Sale Details",
        icon: <FaRupeeSign />,
      },
      {
        href: "/retailer-report/cancelled-orders",
        title: "Cancelled Orders",
        icon: <FaFileAlt />,
      },
      {
        href: "/retailer-report/data-sku-unit",
        title: "Data SKU Unit",
        icon: <FaClipboardCheck />,
      },
      {
        href: "/retailer-report/data-sku-pricing",
        title: "Data SKU Pricing",
        icon: <FaShippingFast />,
      },
    ],
  },
  // {
  //   title: "Report",
  //   icon: <TbReportAnalytics />,
  //   child: [
  //     {
  //       href: "/reports/amount-collection-report",
  //       title: "Amount collection report",
  //       icon: <TbCurrencyRupee />,
  //     },
  //     {
  //       href: "/reports/invoice-wise-delivery-status",
  //       title: "Invoice wise delivery status",
  //       icon: <MdSave />,
  //     },
  //     {
  //       href: "/reports/ds-margin-claims",
  //       title: "DS margin claims",
  //       icon: <BsFileEarmarkCheckFill />,
  //     },
  //     {
  //       href: "/reports/order-fulfillment",
  //       title: "Order fulfillment",
  //       icon: <TbTruckDelivery />,
  //     },
  //     {
  //       href: "/reports/sale",
  //       title: "Sale",
  //       icon: <BsGraphUp />,
  //     },
  //   ],
  // },
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
];

export default sideBarMainList;
