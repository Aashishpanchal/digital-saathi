import MainOrders from "../orders/main-orders";

const orderId = 9;

export default function CancelledOrders() {
  return (
    <MainOrders
      title="Cancelled-Orders"
      orderStatus={orderId}
      filename="cancelled-orders-csv"
    />
  );
}
