import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { MainContainer } from "../../components/layout";
import TotalOrders from "../../components/dashboard/total-orders";
import TotalSku from "../../components/dashboard/total-sku";
import TotalFarmerServiced from "../../components/dashboard/total-farmer-serviced";
import SaleGraph from "../../components/dashboard/sale-graph";
import UsersDetails from "../../components/dashboard/users-details";
import { farmers, retailer, warehouse } from "../../http";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../redux/slices/admin-slice";

export default function Home() {
  const [totalFarmers, setTotalFarmers] = React.useState(0);
  const [totalWarehouses, setTotalWarehouses] = React.useState(0);
  const [totalRetailers, setTotalRetailers] = React.useState(0);

  const dispatch = useDispatch();

  const onFarmerTotal = async () => {
    try {
      const res: any = await farmers("get");
      if (res.status === 200) {
        setTotalFarmers(res.data.totalItems);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const onWarehouseTotal = async () => {
    try {
      const res: any = await warehouse("get");
      if (res.status === 200) {
        setTotalWarehouses(res.data.totalItems);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const onRetailer = async () => {
    try {
      const res: any = await retailer("get");
      if (res.status === 200) {
        setTotalRetailers(res.data.totalItems);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const callThree = async () => {
    dispatch(setPageLoading(true));
    await onFarmerTotal();
    await onWarehouseTotal();
    await onRetailer();
    dispatch(setPageLoading(false));
  };

  React.useEffect(() => {
    callThree();
  }, []);

  return (
    <MainContainer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={4}>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <TotalOrders total={totalFarmers} />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TotalSku total={totalWarehouses} />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TotalFarmerServiced total={totalRetailers} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <SaleGraph />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <UsersDetails
                values={{
                  farmers: totalFarmers,
                  warehouse: totalWarehouses,
                  retailers: totalRetailers,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MainContainer>
  );
}
