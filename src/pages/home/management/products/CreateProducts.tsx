import React from "react";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { FormRender } from "../../../../components/form";
import { shopProducts } from "../../../../http";
import useForms from "../../../../hooks/useForms";
import { useDispatch } from "react-redux";
import { setFormAlert } from "../../../../redux/slices/alertSlice";
import useFormProducts from "./useFormProducts";

export default function CreateProducts() {
  const { getFormsFields, onRetrieveSubCategory } = useFormProducts();

  const dispatch = useDispatch();

  const { data, setData, onClear, errors, onValidate } = useForms({
    fields: getFormsFields,
  });

  const onSave = async () => {
    if (onValidate()) {
      try {
        const res = await shopProducts("post", {
          data: JSON.stringify(data),
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

  React.useEffect(() => {
    if (data.category_id) {
      onRetrieveSubCategory(data.category_id);
    }
  }, [data]);

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
