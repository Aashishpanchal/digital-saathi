import { GiStorkDelivery } from "react-icons/gi";
import MainOrders from "./main-orders";
const orderId = 5;

export default function Delivered() {
  return (
    <MainOrders
      title="Delivered-Orders"
      icon={<GiStorkDelivery/>}
      orderStatus={orderId}
      filename="delivered-orders-csv"
    />
  );
}
