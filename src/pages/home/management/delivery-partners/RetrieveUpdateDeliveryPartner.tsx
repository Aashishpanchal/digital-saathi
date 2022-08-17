import { useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { RetrieveUpdateAutoForm } from "../../../../components/form";
import { deliveryPartners } from "../../../../http";
import useFormDeliveryPartners from "./useFormDeliveryPartners";

export default function RetrieveUpdateCategories() {
  const { partner_id } = useParams();
  const { getFormsFields } = useFormDeliveryPartners();

  return (
    <AdminContainer>
      <MainContainer heading="Delivery Partner Details">
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <RetrieveUpdateAutoForm
            axiosFunction={deliveryPartners}
            fields={getFormsFields}
            params={partner_id}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
