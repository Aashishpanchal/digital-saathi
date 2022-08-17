import React from "react";
import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { RetrieveUpdateAutoForm } from "../../../../../components/form";
import { removePostFix } from "../../../../../components/Utils";
import { shopProductWeightPrice } from "../../../../../http";
import useFormShopProductsWeightPrice from "./useFormShopProductsWeightPrice";

export default function RetrieveUpdateProductWeightPrice() {
  const { sku_name, sku_id, price_id } = useParams();
  const { getFormsFields } = useFormShopProductsWeightPrice();

  const retrieveOnRun = (filterData: any, originalData: any) => {
    return {
      ...filterData,
      weight: removePostFix(originalData.weight || "")[0],
      weightUnit: removePostFix(originalData.weight || "")[1],
    };
  };

  const updateOnRun = (data: any) => {
    const { weightUnit, ...others } = data;
    return { ...others, weight: `${data.weight}${weightUnit}` };
  };

  return (
    <AdminContainer>
      <MainContainer heading={`${sku_name} / Price Details`}>
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <RetrieveUpdateAutoForm
            axiosFunction={shopProductWeightPrice}
            params={price_id}
            fields={getFormsFields}
            setDefaultValue={{
              weightUnit: "",
            }}
            retrieveBeforeCallBack={retrieveOnRun}
            updateBeforeCallBack={updateOnRun}
            extraPostData={{ sku_id }}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
