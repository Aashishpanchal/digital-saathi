import MainOrders from "./main-orders";
const orderId = 7;

export default function Cancelled() {
  return (
    <MainOrders
      title="Cancelled-Orders"
      orderStatus={orderId}
      filename="cancelled-order-csv"
    />
  );
}
