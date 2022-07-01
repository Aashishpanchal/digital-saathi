import React from "react";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { FormRender } from "../../../../components/form";
import { categories } from "../../../../http";
import useFormCategories from "./useFormCategories";
import useForms from "../../../../hooks/useForms";
import { useDispatch } from "react-redux";
import { setFormAlert } from "../../../../redux/slices/alertSlice";

export default function CreateFarmers() {
  const { getFormsFields } = useFormCategories();

  const dispatch = useDispatch();

  const { data, setData, onClear, errors, onValidate } = useForms({
    fields: getFormsFields,
  });

  const onSave = async () => {
    if (onValidate()) {
      const { image, ...newData } = data;
      try {
        const res = await categories("post", {
          data: JSON.stringify(newData),
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
      <MainContainer heading="Category Details">
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
