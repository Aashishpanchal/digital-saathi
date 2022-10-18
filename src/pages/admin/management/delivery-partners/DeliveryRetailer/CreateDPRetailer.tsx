import { useParams } from "react-router-dom";
import MainContainer from "../../../../../components/common/MainContainer";
import { CreateAutoForm } from "../../../../../components/form";
import { deliveryRetailer } from "../../../../../http";
import useFormDPRetailer from "./useFormDPRetailer";

export default function CreateDPRetailer() {
  const { partner_id } = useParams();
  const { getFormsFields } = useFormDPRetailer();

  return (
    <MainContainer heading="Delivery Retailer Details">
      <div className="w-full md:w-[30] lg:w-[30rem]">
        <CreateAutoForm
          axiosFunction={deliveryRetailer}
          fields={getFormsFields}
          extraPostData={{ partner_id }}
        />
      </div>
    </MainContainer>
  );
}
