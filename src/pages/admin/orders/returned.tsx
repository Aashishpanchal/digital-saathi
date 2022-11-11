import { BsBookmarkCheckFill } from "react-icons/bs";
import MainOrders from "./main-orders";
const orderId = 6;

export default function Returned() {
  return (
    <MainOrders
      title="Returned-Orders"
      icon={<BsBookmarkCheckFill/>}
      orderStatus={orderId}
      filename="returned-orders-csv"
    />
  );
}
