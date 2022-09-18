import { useParams } from "react-router-dom";
import MainOrders from "../../../../orders/MainOrders";

export default function RetailerSaleDetails() {
  const { retailer_name, retailer_id } = useParams();
  return (
    <MainOrders
      headerTitle={`${retailer_name} / Input Sale Details`}
      orderId={5}
      params="retailerorders"
      postfix={`&retailer_id=${retailer_id}`}
      exportOff
    />
  );
}
