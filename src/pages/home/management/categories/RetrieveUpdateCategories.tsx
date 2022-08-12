import React from "react";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { FormRender } from "../../../../components/form";
import { categories } from "../../../../http";
import useFormCategories from "./useFormCategories";
import useForms from "../../../../hooks/useForms";
import { useDispatch } from "react-redux";
import { setFormAlert } from "../../../../redux/slices/alertSlice";
import { useParams } from "react-router-dom";
import useBucket from "../../../../hooks/useBucket";

export default function RetrieveUpdateCategories() {
  const { getFormsFields } = useFormCategories();

  const dispatch = useDispatch();

  const { data, setData, errors, onValidate } = useForms({
    fields: getFormsFields,
  });
  const [previousImage, setPreviousImage] = React.useState<string>("");
  const params = useParams();
  const { S3UpdateImage } = useBucket("category-images");

  const onRetrieve = async () => {
    try {
      const res = await categories("get", { params: params.id });
      if (res?.status === 200) {
        const setValues: any = {};
        getFormsFields.forEach((item) => {
          setValues[item.name] = res.data[item.name] || item.defaultValue;
        });
        setPreviousImage(res.data.image);
        setData(setValues);
      }
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const onUpdate = async () => {
    const isValid = onValidate();
    if (isValid) {
      const { image, ...newData } = data;
      const metaData: any = await S3UpdateImage(previousImage, image);
      if (metaData) {
        try {
          const res = await categories("put", {
            params: params.id,
            data: JSON.stringify({
              ...newData,
              image: metaData.Location,
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
                highLight: "Server Validation Error! ",
                text: err?.response?.data?.message,
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

  React.useEffect(() => {}, [data]);

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
