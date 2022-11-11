import { TbTruckDelivery } from "react-icons/tb";
import MainOrders from "./main-orders";
const orderId = 4;

export default function OutForDelivery() {
  return (
    <MainOrders
      title="Out-For-Delivery-Orders"
      icon={<TbTruckDelivery/>}
      orderStatus={orderId}
      filename="out-for-delivery-orders-csv"
    />
  );
}
