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
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { DashboardCard } from "../../../../../components/DashboardCard";
import { shopOrders, shopProducts } from "../../../../../http";
import {
  closeInformationModal,
  setInformationModal,
} from "../../../../../redux/slices/modalSlice";

export default function RetailerDashboard() {
  const { retailer_name, retailer_id } = useParams();
  const [totalOrders, setTotalOrders] = React.useState(0);
  const [totalRetailers, setTotalRetailers] = React.useState(0);
  const [totalFarmers, setTotalFarmers] = React.useState(0);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const layerOne = React.useMemo(
    () => [
      {
        Title: "Total Orders",
        Icon: <FaCartPlus size={50} />,
        num: totalOrders,
      },
      {
        Title: "Total SKUs",
        Icon: <FaBoxes size={50} />,
        num: totalRetailers,
      },
      {
        Title: "Total Farmer Serviced",
        Icon: <FaTruckLoading size={50} />,
        num: totalFarmers,
      },
    ],
    [totalOrders, totalRetailers, totalFarmers]
  );

  const layerTwo = React.useMemo(
    () => [
      {
        Title: "Orders",
        Icon: <FaShoppingBasket size={50} />,
        onClick: () => navigate("retailer-orders"),
      },
      {
        Title: "Input Sale Details",
        Icon: <BiStore size={50} />,
        onClick: () => navigate("retailer-input-sale-details"),
      },
      {
        Title: "Cancelled Orders",
        Icon: <FaCalendarTimes size={50} />,
        onClick: () => navigate("retailer-cancelled-orders"),
      },
      {
        Title: "Data SKU Units",
        Icon: <FaBoxes size={50} />,
        onClick: () => navigate("retailer-sku-units"),
      },
      {
        Title: "Data SKU Pricing",
        Icon: <FaRupeeSign size={50} />,
        onClick: () => navigate("retailer-sku-pricing"),
      },
      {
        Title: "Target vs Achievement",
        Icon: <FaRegChartBar size={50} />,
        onClick: () => navigate("retailer-target-achievement"),
      },
    ],
    []
  );

  const getTotals = async () => {
    dispatch(
      setInformationModal({
        show: true,
        showLoading: true,
      })
    );
    try {
      let res = await shopOrders("get", {
        postfix: `?page=0&retailer_id=${retailer_id}`,
      });
      if (res?.status === 200) {
        setTotalOrders(res.data?.totalItems || 0);
      }

      res = await shopProducts("get", {
        params: "retailerproducts",
        postfix: `?page=0&retailer_id=${retailer_id}`,
      });
      if (res?.status === 200) {
        setTotalRetailers(res.data?.totalItems || 0);
      }
    } catch (err: any) {
      console.log(err?.response);
    }
    dispatch(closeInformationModal());
  };

  React.useEffect(() => {
    getTotals();

    return () => {
      dispatch(closeInformationModal());
    };
  }, []);

  return (
    <AdminContainer>
      <MainContainer
        heading={`${
          retailer_name === "Null" ? "" : retailer_name
        } / Retailer Dashboard`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {layerOne.map((item, index) => (
            <DashboardCard.Container key={index.toString()} disabled={true}>
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
