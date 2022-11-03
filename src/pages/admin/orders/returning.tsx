import MainOrders from "./main-orders";
const orderId = 8;

export default function Returning() {
  return (
    <MainOrders
      title="Returning-Orders"
      orderStatus={orderId}
      filename="returning-orders-csv"
    />
  );
}
