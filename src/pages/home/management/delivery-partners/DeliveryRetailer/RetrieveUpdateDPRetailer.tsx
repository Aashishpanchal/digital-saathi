import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { RetrieveUpdateAutoForm } from "../../../../../components/form";
import { deliveryRetailer } from "../../../../../http";
import useFormDPRetailer from "./useFormDPRetailer";

export default function RetrieveUpdateDPRetailer() {
  const { del_ret_id } = useParams();
  const { getFormsFields } = useFormDPRetailer();

  return (
    <AdminContainer>
      <MainContainer heading="Delivery Retailer Details">
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <RetrieveUpdateAutoForm
            axiosFunction={deliveryRetailer}
            fields={getFormsFields}
            params={del_ret_id}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
