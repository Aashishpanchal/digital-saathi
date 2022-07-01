import React from "react";
import { useNavigate } from "react-router-dom";
import AdminContainer from "../../components/AdminContainer";
import Card from "../../components/dashboard/Card";
import DoughnutChart from "../../components/dashboard/chart/DoughnutChart";
import VerticalBarChart from "../../components/dashboard/chart/VerticalBarChart";
import { farmers, retailer, warehouse } from "../../http";

export default function Dashboard() {
  const [totalFarmers, setTotalFarmers] = React.useState(0);
  const [totalWarehouses, setTotalWarehouses] = React.useState(0);
  const [totalRetailers, setTotalRetailers] = React.useState(0);

  const navigate = useNavigate();
  const onFarmers = () => navigate("/management/farmers");
  const onWarehouses = () => navigate("/management/categories");
  const onRetailers = () => navigate("/management/retailers");

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
    await onFarmerTotal();
    await onWarehouseTotal();
    await onRetailer();
  };

  React.useEffect(() => {
    callThree();
  }, []);

  return (
    <AdminContainer>
      <div className="p-6">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="mx-1">
              <Card type="farmers" total={totalFarmers} onClick={onFarmers} />
            </div>
            <div className="mx-1">
              <Card
                type="warehouses"
                total={totalWarehouses}
                onClick={onWarehouses}
              />
            </div>
            <div className="mx-1">
              <Card
                type="retailers"
                total={totalRetailers}
                onClick={onRetailers}
              />
            </div>
          </div>
          <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="mx-1">
              <VerticalBarChart />
            </div>
            <div className="mx-1">
              <DoughnutChart
                data={{
                  labels: ["Farmers", "Warehouses", "Retailers"],
                  datasets: [
                    {
                      data: [totalFarmers, totalWarehouses, totalRetailers],
                      backgroundColor: ["#61efcd", "#2485fa", "#f9a825"],
                      borderColor: ["#61efcd", "#2485fa", "#f9a825"],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminContainer>
  );
}
