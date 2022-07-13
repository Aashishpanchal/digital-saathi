import React from "react";
import { BiStore } from "react-icons/bi";
import {
  FaBoxes,
  FaCalendarTimes,
  FaCartPlus,
  FaRegChartBar,
  FaRupeeSign,
  FaShoppingBasket,
  FaTruckLoading,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { DashboardCard } from "../../../../../components/DashboardCard";
import { shopOrders } from "../../../../../http";

export default function RetailerDashboard() {
  const { retailer_name, retailer_id } = useParams();
  const [totals, setTotals] = React.useState({
    orders: 0,
    retailers: 0,
    farmers: 0,
  });

  const navigate = useNavigate();

  const navTotalOrders = () => navigate("retailer-orders");

  const layerOne = React.useMemo(
    () => [
      {
        Title: "Total Orders",
        Icon: <FaCartPlus size={50} />,
        num: totals.orders,
        onClick: navTotalOrders,
      },
      {
        Title: "Total SKUs",
        Icon: <FaBoxes size={50} />,
        num: totals.retailers,
        onClick: () => {},
      },
      {
        Title: "Total Farmer Serviced",
        Icon: <FaTruckLoading size={50} />,
        num: totals.farmers,
        onClick: () => {},
      },
    ],
    [totals]
  );

  const layerTwo = React.useMemo(
    () => [
      {
        Title: "Orders",
        Icon: <FaShoppingBasket size={50} />,
        onClick: navTotalOrders,
      },
      {
        Title: "Input Sale Details",
        Icon: <BiStore size={50} />,
        onClick: () => {},
      },
      {
        Title: "Cancelled Orders",
        Icon: <FaCalendarTimes size={50} />,
        onClick: () => {},
      },
      {
        Title: "Data SKU Units",
        Icon: <FaBoxes size={50} />,
        onClick: () => {},
      },
      {
        Title: "Data SKU Pricing",
        Icon: <FaRupeeSign size={50} />,
        onClick: () => {},
      },
      {
        Title: "Target vs Achievement",
        Icon: <FaRegChartBar size={50} />,
        onClick: () => {},
      },
    ],
    []
  );

  const getTotalOrdersToSet = async () => {
    try {
      const res = await shopOrders("get", {
        postfix: `?page=0&retailer_id=${retailer_id}`,
      });
      if (res?.status === 200) {
        setTotals({
          ...totals,
          orders: res.data?.totalItems || 0,
        });
        console.log(totals);
      }
    } catch (err: any) {
      console.log(err?.response);
    }
  };

  React.useEffect(() => {
    getTotalOrdersToSet();
  }, []);

  return (
    <AdminContainer>
      <MainContainer heading={`${retailer_name} / Retailer Dashboard`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {layerOne.map((item, index) => (
            <DashboardCard.Container
              key={index.toString()}
              onClick={item.onClick}
            >
              <DashboardCard.CardNumTitleRender
                title={item.Title}
                num={item.num}
                Icon={item.Icon}
              />
            </DashboardCard.Container>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {layerTwo.map((item, index) => (
            <DashboardCard.Container
              key={index.toString()}
              onClick={item.onClick}
            >
              <DashboardCard.FlexCenterTitle
                title={item.Title}
                Icon={item.Icon}
              />
            </DashboardCard.Container>
          ))}
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
