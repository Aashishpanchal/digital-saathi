import { useParams } from "react-router-dom";
import MainOrders from "../../../../orders/MainOrders";

export default function RetailerTargetAchievement() {
  const { retailer_name, retailer_id } = useParams();
  return (
    <MainOrders
      headerTitle={`${retailer_name} / Target vs Achievement`}
      orderId={2}
      params="retailerorders"
      postfix={`&retailer_id=${retailer_id}`}
      exportOff
    />
  );
}
