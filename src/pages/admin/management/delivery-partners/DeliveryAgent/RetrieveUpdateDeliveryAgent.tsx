import { useParams } from "react-router-dom";
import MainContainer from "../../../../../components/common/MainContainer";
import { RetrieveUpdateAutoForm } from "../../../../../components/form";
import { shopDeliveryAgent } from "../../../../../http";
import useFormDeliveryAgent from "./useFormDeliveryAgent";

export default function RetrieveUpdateDeliveryAgent() {
  const { agent_id } = useParams();
  const { getFormsFields } = useFormDeliveryAgent();

  return (
    <MainContainer heading="Delivery Agent Details">
      <div className="w-full md:w-[30] lg:w-[30rem]">
        <RetrieveUpdateAutoForm
          axiosFunction={shopDeliveryAgent}
          fields={getFormsFields}
          params={agent_id}
        />
      </div>
    </MainContainer>
  );
}
