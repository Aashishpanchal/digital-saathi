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
  BsBookmarkCheckFill,
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
import { useDispatch } from "react-redux";
import { setSideBarOpenClose } from "../../redux/slices/sideBarSlice";
import useDimensions from "../../hooks/useDimensions";

export default function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dimensions = useDimensions();

  const onDashboard = () => navigate("/");
  // management end points
  const onFarmers = () => navigate("/management/farmers");
  const onRetailers = () => navigate("/management/retailers");
  const onCategories = () => navigate("/management/categories");
  const onBrands = () => navigate("/management/brands");
  const onDeliveryPartners = () => navigate("/management/delivery-partners");
  const onProducts = () => navigate("/management/products");
  // master end points
  const onPackages = () => navigate("/masters/packages");
  const onUnits = () => navigate("/masters/units");
  const onAreas = () => navigate("/masters/areas");
  // reports end points
  const onAmountCollectionReport = () =>
    navigate("/reports/amount-collection-report");
  // orders end points
  const onNewOrders = () => navigate("/orders/new-orders");
  const onAcceptedOrders = () => navigate("/orders/orders-accepted");
  const onInProcessOrders = () => navigate("/orders/orders-in-progress");
  const onOutOfDeliveryOrders = () =>
    navigate("/orders/orders-out-for-delivery");
  const onDeliveredOrders = () => navigate("/orders/orders-delivered");
  const onCancelledOrders = () => navigate("/orders/orders-cancelled");
  const onReturningOrders = () => navigate("/orders/orders-returning");
  const onReturnedOrders = () => navigate("/orders/orders-returned");

  React.useEffect(() => {
    if (dimensions.width <= 640) {
      dispatch(setSideBarOpenClose(false));
    }
  }, []);

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
            onClick={onProducts}
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
          <SideBarItem
            active={location.pathname.includes("/masters/packages")}
            onClick={onPackages}
            icon={<RiShoppingBag3Fill size={20} />}
          >
            Packages
          </SideBarItem>
          <SideBarItem
            active={location.pathname.includes("/masters/units")}
            onClick={onUnits}
            icon={<MdAcUnit size={20} />}
          >
            Units
          </SideBarItem>
          <SideBarItem
            active={location.pathname.includes("/masters/areas")}
            onClick={onAreas}
            icon={<TbSquareAsterisk size={20} />}
          >
            Areas
          </SideBarItem>
        </Collapse>
        <Collapse
          urlMatchToOpen="/reports"
          label="Reports"
          icon={<TbReportAnalytics size={24} />}
        >
          <SideBarItem
            onClick={onAmountCollectionReport}
            icon={<TbCurrencyRupee size={20} />}
          >
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
          <SideBarItem
            onClick={onNewOrders}
            icon={<VscNewFile size={20} />}
            active={location.pathname.includes("/orders/new-orders")}
          >
            New
          </SideBarItem>
          <SideBarItem
            onClick={onAcceptedOrders}
            icon={<TiTicket size={20} />}
            active={location.pathname.includes("/orders/orders-accepted")}
          >
            Accepted
          </SideBarItem>
          <SideBarItem
            onClick={onInProcessOrders}
            icon={<FcProcess size={20} />}
            active={location.pathname.includes("/orders/orders-in-progress")}
          >
            In-process
          </SideBarItem>
          <SideBarItem
            onClick={onOutOfDeliveryOrders}
            icon={<TbTruckDelivery size={20} />}
            active={location.pathname.includes(
              "/orders/orders-out-for-delivery"
            )}
          >
            Out for delivery
          </SideBarItem>
          <SideBarItem
            onClick={onDeliveredOrders}
            icon={<GiStorkDelivery size={20} />}
            active={location.pathname.includes("/orders/orders-delivered")}
          >
            Delivered
          </SideBarItem>
          <SideBarItem
            onClick={onReturningOrders}
            icon={<TbTruckReturn size={20} />}
            active={location.pathname.includes("/orders/orders-returning")}
          >
            Returning
          </SideBarItem>
          <SideBarItem
            onClick={onReturnedOrders}
            icon={<BsBookmarkCheckFill size={20} />}
            active={location.pathname.includes("/orders/orders-returned")}
          >
            Returned
          </SideBarItem>
          <SideBarItem
            onClick={onCancelledOrders}
            icon={<MdFreeCancellation size={20} />}
            active={location.pathname.includes("/orders/orders-cancelled")}
          >
            Cancelled
          </SideBarItem>
        </Collapse>
        <SideBarItem icon={<FaKey size={20} />}>Change Password</SideBarItem>
        <SideBarItem icon={<FiLogOut size={20} />}>Logout</SideBarItem>
      </SideBarItemContainer>
    </SidebarContainer>
  );
}
