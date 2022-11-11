import { TbTruckReturn } from "react-icons/tb";
import MainOrders from "./main-orders";
const orderId = 8;

export default function Returning() {
  return (
    <MainOrders
      title="Returning-Orders"
      icon={<TbTruckReturn/>}
      orderStatus={orderId}
      filename="returning-orders-csv"
    />
  );
}
