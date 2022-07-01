import React from "react";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { FormRender } from "../../../../components/form";
import { shopProducts } from "../../../../http";
import useForms from "../../../../hooks/useForms";
import { useDispatch } from "react-redux";
import { setFormAlert } from "../../../../redux/slices/alertSlice";
import useFormProducts from "./useFormProducts";
import { useParams } from "react-router-dom";

export default function RetrieveUpdateProduct() {
  const { getFormsFields, onRetrieveSubCategory } = useFormProducts();

  const { sku_id } = useParams();

  const dispatch = useDispatch();

  const { data, setData, errors, onValidate } = useForms({
    fields: getFormsFields,
  });

  const onRetrieve = async () => {
    try {
      const res = await shopProducts("get", { params: sku_id });
      if (res?.status === 200) {
        const setValues: any = {};
        getFormsFields.forEach((item) => {
          setValues[item.name] = `${res.data[item.name] || item.defaultValue}`;
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
        const res = await shopProducts("put", {
          params: sku_id,
          data: JSON.stringify(data),
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
            fields={getFormsFields}
            errors={errors}
            onUpdate={onUpdate}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
