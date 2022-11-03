import MainOrders from "./main-orders";
const orderId = 6;

export default function Returned() {
  return (
    <MainOrders
      title="Returned-Orders"
      orderStatus={orderId}
      filename="returned-orders-csv"
    />
  );
}
