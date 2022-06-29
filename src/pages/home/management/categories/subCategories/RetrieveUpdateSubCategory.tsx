import React from "react";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { useParams } from "react-router-dom";
import { subCategories } from "../../../../../http";
import useForms from "../../../../../hooks/useForms";
import { FormRender } from "../../../../../components/form";
import useFormSubCategories from "./useFormSubCategories";

export default function RetrieveUpdateSubCategory() {
  const { category_name, subcategory_id } = useParams();
  const { getFormsFields } = useFormSubCategories();

  const { data, setData, errors, onValidate } = useForms({
    fields: getFormsFields,
  });

  const onRetrieve = async () => {
    try {
      const res = await subCategories("get", { params: subcategory_id });
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
        const res = await subCategories("put", {
          params: subcategory_id,
          data: JSON.stringify({
            name: data.name,
            description: data.description,
          }),
        });
        if (res?.status === 200) {
          await onRetrieve();
          return true;
        }
      } catch (err: any) {
        console.log(err.response);
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
      <MainContainer heading={`${category_name} / Subcategories Detail`}>
        <div className="w-full md:w-[28rem] lg:w-[28rem]">
          <FormRender
            errors={errors}
            fields={getFormsFields}
            data={data}
            setData={setData}
            onUpdate={onUpdate}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
