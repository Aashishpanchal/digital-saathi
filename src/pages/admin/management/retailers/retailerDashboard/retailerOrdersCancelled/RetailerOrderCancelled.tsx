import { useParams } from "react-router-dom";
import MainOrders from "../../../../orders/MainOrders";

export default function RetailerOrderCancelled() {
  const { retailer_name, retailer_id } = useParams();
  return (
    <MainOrders
      headerTitle={`${retailer_name} / Cancelled Orders`}
      orderId={9}
      params="retailerorders"
      postfix={`&retailer_id=${retailer_id}`}
      exportOff
    />
  );
}
