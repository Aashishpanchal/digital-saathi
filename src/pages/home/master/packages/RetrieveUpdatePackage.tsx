import React from "react";
import { useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { FormRender } from "../../../../components/form";
import { shopPackages } from "../../../../http";
import { useDispatch } from "react-redux";
import useFormPackages from "./useFormPackages";
import useForms from "../../../../hooks/useForms";
import { setFormAlert } from "../../../../redux/slices/alertSlice";

export default function RetrieveUpdatePackage() {
  const { package_id } = useParams();
  const { getFormsFields } = useFormPackages();

  const { data, setData, errors, onValidate } = useForms({
    fields: getFormsFields,
  });

  const dispatch = useDispatch();

  const onRetrieve = async () => {
    try {
      const res = await shopPackages("get", { params: package_id });
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
        const res = await shopPackages("put", {
          params: package_id,
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
      return false;
    }
    return isValid;
  };

  React.useEffect(() => {
    onRetrieve();
  }, []);

  return (
    <AdminContainer>
      <MainContainer heading="Packages Details">
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
