import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { CreateAutoForm } from "../../../../../components/form";
import { shopProductWeightPrice } from "../../../../../http";
import useFormShopProductsWeightPrice from "./useFormShopProductsWeightPrice";

export default function CreateProductWeightPrice() {
  const { sku_name, sku_id } = useParams();
  const { getFormsFields } = useFormShopProductsWeightPrice();

  const saveBeforeCallBack = (data: any) => {
    const { weightUnit, ...others } = data;
    return { ...others, weight: `${data.weight}${weightUnit}` };
  };

  return (
    <AdminContainer>
      <MainContainer heading={`${sku_name} / Price Details`}>
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <CreateAutoForm
            axiosFunction={shopProductWeightPrice}
            fields={getFormsFields}
            extraPostData={{
              sku_id,
            }}
            saveBeforeCallBack={saveBeforeCallBack}
            setDefaultValue={{
              weightUnit: "",
            }}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
