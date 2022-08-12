import React from "react";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { FormRender } from "../../../../components/form";
import { brands } from "../../../../http";
import { useDispatch } from "react-redux";
import useFormBrands from "./useFormBrands";
import useForms from "../../../../hooks/useForms";
import { setFormAlert } from "../../../../redux/slices/alertSlice";
import { useParams } from "react-router-dom";
import useBucket from "../../../../hooks/useBucket";

export default function RetrieveUpdateBrands() {
  const { getFormsFields } = useFormBrands();
  const { data, setData, errors, onValidate } = useForms({
    fields: getFormsFields,
  });
  const dispatch = useDispatch();
  const params = useParams();
  const { S3UpdateImage } = useBucket("brand-images");
  const [previousImage, setPreviousImage] = React.useState<string>("");

  const onRetrieve = async () => {
    try {
      const res = await brands("get", { params: params.id });
      if (res?.status === 200) {
        const setValues: any = {};
        getFormsFields.forEach((item) => {
          setValues[item.name] = res.data[item.name] || item.defaultValue;
        });
        setPreviousImage(res.data.brand_image);
        setData(setValues);
      }
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const onUpdate = async () => {
    const isValid = onValidate();
    if (isValid) {
      const { brand_image, ...newData } = data;
      const metaData: any = await S3UpdateImage(previousImage, brand_image);
      if (metaData) {
        try {
          const res = await brands("put", {
            params: params.id,
            data: JSON.stringify({
              ...newData,
              brand_image: metaData.Location,
            }),
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
                highLight: "Server Validation Error!",
                text: err?.response?.data?.message || err,
                show: true,
              })
            );
          }
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
      <MainContainer heading="Brand Details">
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
