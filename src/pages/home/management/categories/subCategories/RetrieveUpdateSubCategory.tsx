import React from "react";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { useParams } from "react-router-dom";
import { subCategories } from "../../../../../http";
import useForms from "../../../../../hooks/useForms";
import { FormRender } from "../../../../../components/form";
import useFormSubCategories from "./useFormSubCategories";
import useBucket from "../../../../../hooks/useBucket";
import { useDispatch } from "react-redux";
import { setFormAlert } from "../../../../../redux/slices/alertSlice";
import {
  closeInformationModal,
  setInformationModal,
} from "../../../../../redux/slices/modalSlice";

export default function RetrieveUpdateSubCategory() {
  const { category_name, subcategory_id } = useParams();
  const { getFormsFields } = useFormSubCategories();

  const { data, setData, errors, onValidate } = useForms({
    fields: getFormsFields,
  });
  const { S3UpdateImage } = useBucket("sub-category-images");
  const [previousImage, setPreviousImage] = React.useState<string>("");
  const dispatch = useDispatch();

  const onRetrieve = async () => {
    dispatch(
      setInformationModal({
        show: true,
        showLoading: true,
      })
    );
    try {
      const res = await subCategories("get", { params: subcategory_id });
      if (res?.status === 200) {
        const setValues: any = {};
        getFormsFields.forEach((item) => {
          setValues[item.name] = res.data[item.name] || item.defaultValue;
        });
        setPreviousImage(res.data.image);
        setData(setValues);
      }
    } catch (err: any) {
      dispatch(
        setInformationModal({
          show: true,
          runClose: true,
          heading: "Error/Server Side Error",
          title: "Extract Data UnComplete",
          message: err.response || err,
        })
      );
    }
    dispatch(closeInformationModal());
  };

  const onUpdate = async () => {
    const isValid = onValidate();
    if (isValid) {
      const { image, ...newData } = data;
      const metaData: any = await S3UpdateImage(previousImage, image);
      if (metaData) {
        try {
          const res = await subCategories("put", {
            params: subcategory_id,
            data: JSON.stringify({
              ...newData,
              image: metaData.Location,
            }),
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
