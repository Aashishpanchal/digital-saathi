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

export default function RetrieveUpdateProductWeightPrice() {
  const { sku_name, sku_id, price_id } = useParams();
  const { getFormsFields, getUnitOptionsId, unitOptions, removePostFix } =
    useFormShopProductsWeightPrice();

  const dispatch = useDispatch();

  const { data, setData, errors, onValidate } = useForms({
    fields: getFormsFields,
    setDefaultValue: {
      units: "",
    },
  });

  const onRetrieve = async () => {
    try {
      const res = await shopProductWeightPrice("get", {
        params: price_id,
      });
      if (res?.status === 200) {
        const setValues: any = {};
        getFormsFields.forEach((item) => {
          setValues[item.name] = `${res.data[item.name] || item.defaultValue}`;
        });
        setData({
          ...setValues,
          units: getUnitOptionsId(setValues.weight),
          weight: removePostFix(setValues.weight)[0],
        });
      }
    } catch (e: any) {
      console.log(e.response);
    }
  };

  const onUpdate = async () => {
    const isValid = onValidate();
    if (isValid) {
      let { units, ...updateData } = data;
      updateData.weight += unitOptions[units];
      try {
        const res = await shopProductWeightPrice("put", {
          params: price_id,
          data: JSON.stringify({
            ...updateData,
            sku_id,
          }),
        });
        if (res?.status === 200) {
          await onRetrieve();
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
      return false;
    }
    return isValid;
  };

  React.useEffect(() => {
    onRetrieve();
  }, [unitOptions]);

  return (
    <AdminContainer>
      <MainContainer heading={`${sku_name} / Price Details`}>
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <FormRender
            data={data}
            setData={setData}
            fields={getFormsFields}
            errors={errors}
            onUpdate={onUpdate}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
