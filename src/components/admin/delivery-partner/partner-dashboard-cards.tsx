import React from "react";
import { Grid, alpha } from "@mui/material";
import { FaCartPlus, FaTruckLoading } from "react-icons/fa";
import { shopOrders } from "../../../http";
import DashboardCard from "../../dashboard/dashboard-card";
import BhimSvg from "../../../assets/bhim-100.svg";
import { queryToStr } from "../utils";

export default function PartnerDashboardCards(props: { partnerId: string }) {
  const { partnerId } = props;
  const [totalOrders, setTotalOrders] = React.useState(0);
  const [totalUPI, setTotalUPI] = React.useState(0);
  const [totalFarmers, setTotalFarmers] = React.useState(0);

  const getTotals = async () => {
    try {
      let res = await shopOrders("get", {
        postfix: `?page=0&partner_id=${partnerId}`,
      });
      if (res?.status === 200) {
        setTotalOrders(res.data?.totalItems || 0);
      }

      res = await shopOrders("get", {
        params: "partner",
        postfix: "?".concat(
          queryToStr({
            order_status: 5,
            page: 0,
            size: 1,
            partner_id: partnerId,
          })
        ),
      });

      if (res?.status === 200) {
        setTotalFarmers(res.data?.totalItems);
      }
    } catch (err: any) {
      console.log(err?.response);
    }
  };

  React.useEffect(() => {
    getTotals();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item lg={4} sm={6} xl={4} xs={12}>
        <DashboardCard
          header={"Total Orders"}
          title={totalOrders.toString()}
          icon={<FaCartPlus color="#4f46e5" />}
          color={alpha("#4f46e5", 0.2)}
        />
      </Grid>
      <Grid item xl={4} lg={4} sm={6} xs={12}>
        <DashboardCard
          header={"UPI Payment"}
          title={totalUPI.toString()}
          icon={<img src={BhimSvg} />}
          color={alpha("#0891b2", 0.2)}
        />
      </Grid>
      <Grid item xl={4} lg={4} sm={6} xs={12}>
        <DashboardCard
          header={"Total Farmer Serviced"}
          title={totalFarmers.toString()}
          icon={<FaTruckLoading color="#059669" />}
          color={alpha("#059669", 0.2)}
        />
      </Grid>
    </Grid>
  );
}
