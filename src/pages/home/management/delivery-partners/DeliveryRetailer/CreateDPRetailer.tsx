import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { FormRender } from "../../../../../components/form";
import useForms from "../../../../../hooks/useForms";
import { deliveryRetailer } from "../../../../../http";
import { setFormAlert } from "../../../../../redux/slices/alertSlice";
import useFormDPRetailer from "./useFormDPRetailer";

export default function CreateDPRetailer() {
  const { partner_id } = useParams();
  const { getFormsFields } = useFormDPRetailer();
  const { data, setData, onClear, errors, onValidate } = useForms({
    fields: getFormsFields,
  });
  const dispatch = useDispatch();

  const onSave = async () => {
    if (onValidate()) {
      try {
        const res = await deliveryRetailer("post", {
          data: JSON.stringify({ ...data, partner_id }),
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
      <MainContainer heading="Delivery Partner Details">
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
