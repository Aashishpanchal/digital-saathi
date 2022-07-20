import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { FormRender } from "../../../../../components/form";
import useForms from "../../../../../hooks/useForms";
import { shopDeliveryAgent } from "../../../../../http";
import { setFormAlert } from "../../../../../redux/slices/alertSlice";
import useFormDeliveryAgent from "./useFormDeliveryAgent";

export default function RetrieveUpdateDeliveryAgent() {
  const { agent_id } = useParams();
  const { getFormsFields } = useFormDeliveryAgent();
  const { data, setData, errors, onValidate } = useForms({
    fields: getFormsFields,
  });
  const dispatch = useDispatch();

  const onRetrieve = async () => {
    try {
      const res = await shopDeliveryAgent("get", { params: agent_id });
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
        const res = await shopDeliveryAgent("put", {
          params: agent_id,
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

  return (
    <AdminContainer>
      <MainContainer heading="Delivery Agent Details">
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
