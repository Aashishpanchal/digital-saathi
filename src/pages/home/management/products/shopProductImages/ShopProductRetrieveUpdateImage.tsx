import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { FormRender } from "../../../../../components/form";
import useForms from "../../../../../hooks/useForms";
import { shopProductImages } from "../../../../../http";
import { setFormAlert } from "../../../../../redux/slices/alertSlice";
import useFormProductImages from "./useFormProductImages";

export default function ShopProductRetrieveUpdateImage() {
  const { sku_name, sku_id, image_id } = useParams();

  const { getFormsFields } = useFormProductImages();

  const dispatch = useDispatch();

  const { data, setData, errors, onValidate } = useForms({
    fields: getFormsFields,
  });

  const onRetrieve = async () => {
    try {
      const res = await shopProductImages("get", { params: image_id });
      if (res?.status === 200) {
        const setValues: any = {};
        getFormsFields.forEach((item) => {
          setValues[item.name] = res.data[item.name] || item.defaultValue;
        });
        setData(setValues);
      }
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const onUpdate = async () => {
    const isValid = onValidate();
    if (isValid) {
      try {
        const res = await shopProductImages("put", {
          params: image_id,
          data: JSON.stringify({ ...data, sku_id }),
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
  }, []);

  return (
    <AdminContainer>
      <MainContainer heading={`${sku_name} / Details`}>
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
