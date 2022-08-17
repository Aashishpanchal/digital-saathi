import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { CreateAutoForm } from "../../../../components/form";
import { deliveryPartners } from "../../../../http";
import useFormDeliveryPartners from "./useFormDeliveryPartners";

export default function CreateFarmers() {
  const { getFormsFields } = useFormDeliveryPartners();

  return (
    <AdminContainer>
      <MainContainer heading="Delivery Partner Details">
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <CreateAutoForm
            axiosFunction={deliveryPartners}
            fields={getFormsFields}
            saveBeforeCallBack={(data) => {
              const { pincode, ...others } = data;
              return {
                ...others,
                pincode: parseInt(pincode || "0"),
                // auth_code: "78787878",
              };
            }}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
