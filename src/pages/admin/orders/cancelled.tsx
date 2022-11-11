import { MdFreeCancellation } from "react-icons/md";
import MainOrders from "./main-orders";
const orderId = 7;

export default function Cancelled() {
  return (
    <MainOrders
      title="Cancelled-Orders"
      icon={<MdFreeCancellation/>}
      orderStatus={orderId}
      filename="cancelled-order-csv"
    />
  );
}
