import { FcProcess } from "react-icons/fc";
import MainOrders from "./main-orders";
const orderId = 3;

export default function InProcess() {
  return (
    <MainOrders
      title="In-Process-Orders"
      orderStatus={orderId}
      icon={<FcProcess/>}
      filename="in-process-orders-csv"
    />
  );
}
