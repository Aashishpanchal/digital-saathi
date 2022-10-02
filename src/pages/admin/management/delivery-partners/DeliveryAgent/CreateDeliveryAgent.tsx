import { useParams } from "react-router-dom";
import MainContainer from "../../../../../components/common/MainContainer";
import { CreateAutoForm } from "../../../../../components/form";
import { shopDeliveryAgent } from "../../../../../http";
import useFormDeliveryAgent from "./useFormDeliveryAgent";

export default function CreateDeliveryAgent() {
  const { partner_id } = useParams();
  const { getFormsFields } = useFormDeliveryAgent();

  return (
    <MainContainer heading="Delivery Agent Details">
      <div className="w-full md:w-[30] lg:w-[30rem]">
        <CreateAutoForm
          axiosFunction={shopDeliveryAgent}
          fields={getFormsFields}
          extraPostData={{ partner_id }}
          // for testing because auth code not set
          // saveBeforeCallBack={(data) => ({
          //   ...data,
          //   auth_code: "auth-code",
          // })}
        />
      </div>
    </MainContainer>
  );
}
