import MainOrders from "../orders/main-orders";
const orderId = 5;

export default function InputSaleDetails() {
  return (
    <MainOrders
      title="Input-Sale-Details"
      orderStatus={orderId}
      filename="input-sale-details-orders-csv"
    />
  );
}
