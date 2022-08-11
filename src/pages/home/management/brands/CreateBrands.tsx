import React from "react";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { FormRender } from "../../../../components/form";
import { brands } from "../../../../http";
import { useDispatch } from "react-redux";
import useFormBrands from "./useFormBrands";
import useForms from "../../../../hooks/useForms";
import { setFormAlert } from "../../../../redux/slices/alertSlice";
import useBucket from "../../../../hooks/useBucket";

export default function CreateBrands() {
  const { getFormsFields } = useFormBrands();

  const dispatch = useDispatch();

  const { S3ImageUploader } = useBucket("brand-images");

  const { data, setData, onClear, errors, onValidate } = useForms({
    fields: getFormsFields,
  });

  const onSave = async () => {
    if (onValidate()) {
      try {
        const { brand_image, ...newData } = data;
        const metaData: any = await S3ImageUploader(brand_image);
        if (metaData) {
          const res = await brands("post", {
            data: JSON.stringify({
              ...newData,
              brand_image: metaData.Location,
            }),
          });
          if (res?.status === 200) {
            return true;
          }
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
      <MainContainer heading="Brand Details">
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
