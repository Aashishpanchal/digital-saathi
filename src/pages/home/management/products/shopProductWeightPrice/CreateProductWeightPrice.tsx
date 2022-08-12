import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { FormRender } from "../../../../../components/form";
import useForms from "../../../../../hooks/useForms";
import { shopProductWeightPrice } from "../../../../../http";
import { setFormAlert } from "../../../../../redux/slices/alertSlice";
import useFormShopProductsWeightPrice from "./useFormShopProductsWeightPrice";

export default function CreateProductWeightPrice() {
  const { sku_name, sku_id } = useParams();
  const { getFormsFields, unitOptions } = useFormShopProductsWeightPrice();

  const dispatch = useDispatch();

  const { data, setData, onClear, errors, onValidate } = useForms({
    fields: getFormsFields,
    setDefaultValue: {
      units: "",
    },
  });

  const onSave = async () => {
    if (onValidate()) {
      let { units, ...saveData } = data;
      saveData.weight += unitOptions[units];
      try {
        const res = await shopProductWeightPrice("post", {
          data: JSON.stringify({
            sku_id,
            ...saveData,
          }),
        });
        if (res?.status === 200) {
          return true;
        }
      } catch (err: any) {
        if (err?.response?.status === 400) {
          dispatch(
            setFormAlert({
              type: "red",
              highLight: "Server Validation Error! ",
              text: err?.response?.data?.message,
              show: true,
            })
          );
        }
      }
    }
    return false;
  };

  const onSaveStay = async () => {
    const res = await onSave();
    if (res) {
      dispatch(
        setFormAlert({
          type: "green",
          highLight: "Success! ",
          text: "Data Add Successfully..",
          show: true,
        })
      );
    }
  };

  return (
    <AdminContainer>
      <MainContainer heading={`${sku_name} / Price Details`}>
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <FormRender
            data={data}
            setData={setData}
            onReset={onClear}
            fields={getFormsFields}
            errors={errors}
            onSave={onSave}
            onSaveStay={onSaveStay}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
