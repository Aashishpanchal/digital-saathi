import React from "react";
import SidebarContainer from "./container/SidebarContainer";
import CloseAction from "./CloseAction";
import SideBarItem from "./SideBarItem";
import SideBarItemContainer from "./container/SideBarItemContainer";
import { HiChartPie } from "react-icons/hi";
import { FaUserPlus, FaTractor, FaUserTie, FaKey } from "react-icons/fa";
import {
  TbTruckDelivery,
  TbBrandSublimeText,
  TbSquareAsterisk,
  TbReportAnalytics,
  TbCurrencyRupee,
  TbTruckReturn,
} from "react-icons/tb";
import {
  BsShopWindow,
  BsFileEarmarkCheckFill,
  BsJournalBookmark,
} from "react-icons/bs";
import { RiShoppingBag3Fill } from "react-icons/ri";
import Collapse from "./Collapse";
import {
  MdAcUnit,
  MdOutlineAccountTree,
  MdProductionQuantityLimits,
  MdSave,
  MdFreeCancellation,
} from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { BsGraphUp } from "react-icons/bs";
import { TiTicket } from "react-icons/ti";
import { FcProcess } from "react-icons/fc";
import { GiStorkDelivery } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const onDashboard = () => navigate("/");
  const onFarmers = () => navigate("/management/farmers");
  const onRetailers = () => navigate("/management/retailers");
  const onCategories = () => navigate("/management/categories");
  const onBrands = () => navigate("/management/brands");
  const onDeliveryPartners = () => navigate("/management/delivery-partners");

  return (
    <SidebarContainer>
      <div className="w-full flex justify-between sm:justify-center md:justify-center lg:justify-center items-center">
        <a href="/">
          <div className="text-center text-3xl font-semibold text-blue-light">
            <div className="flex justify-center">
              <img
                className="w-fit h-fit"
                src="/assets/images/logo.png"
                alt="Logo"
              />
            </div>
          </div>
        </a>
        <CloseAction />
      </div>
      <SideBarItemContainer>
        <SideBarItem
          onClick={onDashboard}
          active={location.pathname === "/"}
          icon={<HiChartPie size={24} />}
        >
          DashBoard
        </SideBarItem>
        <Collapse
          urlMatchToOpen="/management"
          label="Management"
          icon={<FaUserPlus size={24} />}
        >
          <SideBarItem
            active={location.pathname.includes("/management/categories")}
            onClick={onCategories}
            icon={<MdOutlineAccountTree size={20} />}
          >
            Categories
          </SideBarItem>
          <SideBarItem
            active={location.pathname.includes("/management/brands")}
            onClick={onBrands}
            icon={<TbBrandSublimeText size={20} />}
          >
            Brands
          </SideBarItem>
          <SideBarItem
            active={location.pathname.includes("/management/products")}
            onClick={onFarmers}
            icon={<MdProductionQuantityLimits size={20} />}
          >
            Products
          </SideBarItem>
          <SideBarItem
            active={location.pathname.includes("/management/farmers")}
            onClick={onFarmers}
            icon={<FaTractor size={20} />}
          >
            Farmers
          </SideBarItem>
          <SideBarItem
            active={location.pathname.includes("/management/retailers")}
            onClick={onRetailers}
            icon={<BsShopWindow size={20} />}
          >
            Retailers
          </SideBarItem>
          <SideBarItem
            active={location.pathname.includes("/management/delivery-partners")}
            onClick={onDeliveryPartners}
            icon={<TbTruckDelivery size={30} />}
          >
            Delivery Partners
          </SideBarItem>
        </Collapse>
        <Collapse
          urlMatchToOpen="/master"
          label="Master"
          icon={<FaUserTie size={24} />}
        >
          <SideBarItem icon={<RiShoppingBag3Fill size={20} />}>
            Packages
          </SideBarItem>
          <SideBarItem icon={<MdAcUnit size={20} />}>Units</SideBarItem>
          <SideBarItem icon={<TbSquareAsterisk size={20} />}>Areas</SideBarItem>
        </Collapse>
        <Collapse
          urlMatchToOpen="/reports"
          label="Reports"
          icon={<TbReportAnalytics size={24} />}
        >
          <SideBarItem icon={<TbCurrencyRupee size={20} />}>
            Amount Collection Report
          </SideBarItem>
          <SideBarItem icon={<MdSave size={20} />}>
            Invoice wise delivery Status
          </SideBarItem>
          <SideBarItem icon={<BsFileEarmarkCheckFill size={20} />}>
            DS Margin Claims
          </SideBarItem>
          <SideBarItem icon={<TbTruckDelivery size={20} />}>
            Order Fulfillment
          </SideBarItem>
          <SideBarItem icon={<BsGraphUp size={20} />}>Sale</SideBarItem>
        </Collapse>
        <Collapse
          urlMatchToOpen="/orders"
          label="Orders"
          icon={<BsJournalBookmark size={24} />}
        >
          <SideBarItem icon={<VscNewFile size={20} />}>New</SideBarItem>
          <SideBarItem icon={<TiTicket size={20} />}>Accepted</SideBarItem>
          <SideBarItem icon={<FcProcess size={20} />}>In-process</SideBarItem>
          <SideBarItem icon={<TbTruckDelivery size={20} />}>
            Out for delivery
          </SideBarItem>
          <SideBarItem icon={<GiStorkDelivery size={20} />}>
            Delivered
          </SideBarItem>
          <SideBarItem icon={<TbTruckReturn size={20} />}>
            Returning
          </SideBarItem>
          <SideBarItem icon={<MdFreeCancellation size={20} />}>
            Cancelled
          </SideBarItem>
        </Collapse>
        <SideBarItem icon={<FaKey size={20} />}>Change Password</SideBarItem>
        <SideBarItem icon={<FiLogOut size={20} />}>Logout</SideBarItem>
      </SideBarItemContainer>
    </SidebarContainer>
  );
}
