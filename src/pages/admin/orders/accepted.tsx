import { TiTicket } from "react-icons/ti";
import MainOrders from "./main-orders";
const orderId = 1;

export default function Accepted() {
  return (
    <MainOrders
      title="Accepted-Orders"
      orderStatus={orderId}
      icon={<TiTicket/>}
      filename="accepted-orders-csv"
    />
  );
}
