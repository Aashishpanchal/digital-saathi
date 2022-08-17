import React from "react";
import ImageInput from "../../../../components/form/inputs/ImageInput";

export default function useFormBrands() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "Brand Name",
        name: "brand_name",
        defaultValue: "",
        validate: true,
        hintText: "Brand Name is compulsory",
      },
      {
        label:
          "Drag & Drop Files But Image size should be square (500) x (500).",
        name: "brand_image",
        hintText: "Category Image is compulsory",
        validate: true,
        defaultValue: "",
        Field: (props: any) => {
          return (
            <ImageInput
              label={props.label}
              hintText={props.hint}
              handleChange={(file: any) => {
                props.setData({ ...props.data, brand_image: file });
              }}
              file={props.data.brand_image}
            />
          );
        },
      },
      {
        type: "textarea",
        label: "Description",
        name: "description",
        defaultValue: "",
      },
    ],
    []
  );

  return { getFormsFields };
}
