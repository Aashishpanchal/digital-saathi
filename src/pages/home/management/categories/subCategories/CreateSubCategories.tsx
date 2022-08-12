import React from "react";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { useParams } from "react-router-dom";
import { subCategories } from "../../../../../http";
import useForms from "../../../../../hooks/useForms";
import { FormRender } from "../../../../../components/form";
import useFormSubCategories from "./useFormSubCategories";
import { useDispatch } from "react-redux";
import { setFormAlert } from "../../../../../redux/slices/alertSlice";
import useBucket from "../../../../../hooks/useBucket";

export default function CreateSubCategories() {
  const { parent_category_id, category_name } = useParams();
  const { getFormsFields } = useFormSubCategories();

  const dispatch = useDispatch();
  const { S3ImageUploader } = useBucket("sub-category-images");

  const { data, setData, onClear, errors, onValidate } = useForms({
    fields: getFormsFields,
  });

  const onSave = async () => {
    if (onValidate()) {
      const { image, ...newData } = data;
      try {
        const metaData: any = await S3ImageUploader(image);
        if (metaData) {
          const res = await subCategories("post", {
            data: JSON.stringify({
              ...newData,
              image: metaData.Location,
              parent_category_id,
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
      <MainContainer heading={`${category_name} / Subcategories Detail`}>
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <FormRender
            fields={getFormsFields}
            errors={errors}
            data={data}
            setData={setData}
            onSave={onSave}
            onSaveStay={onSaveStay}
            onReset={onClear}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
