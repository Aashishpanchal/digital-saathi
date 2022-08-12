import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { FormRender } from "../../../../../components/form";
import useBucket from "../../../../../hooks/useBucket";
import useForms from "../../../../../hooks/useForms";
import { shopProductImages } from "../../../../../http";
import { setFormAlert } from "../../../../../redux/slices/alertSlice";
import useFormProductImages from "./useFormProductImages";

export default function ShopProductUploadImage() {
  const { sku_name, sku_id } = useParams();

  const { getFormsFields } = useFormProductImages();

  const dispatch = useDispatch();
  const { S3ImageUploader } = useBucket("product-images");

  const { data, setData, onClear, errors, onValidate } = useForms({
    fields: getFormsFields,
  });

  const onSave = async () => {
    if (onValidate()) {
      const { image, ...newData } = data;
      const metaData: any = await S3ImageUploader(image);
      if (metaData) {
        try {
          const res = await shopProductImages("post", {
            data: JSON.stringify({
              ...newData,
              sku_id,
              image: metaData.Location,
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
      <MainContainer heading={`${sku_name} / Details`}>
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
