import React from "react";
import ImageInput from "../../../../../components/form/inputs/ImageInput";

export default function useFormSubCategories() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "Category Name",
        name: "name",
        defaultValue: "",
        validate: true,
        hintText: "Category Name is compulsory",
      },
      {
        label:
          "Drag & Drop Files But Image size should be square (500) x (500).",
        name: "image",
        defaultValue: null,
        hintText: "Category Image is compulsory",
        validate: true,
        Field: (props: any) => {
          return (
            <ImageInput
              label={props.label}
              hintText={props.hint}
              handleChange={(file: any) => {
                props.setData({ ...props.data, image: file });
              }}
              file={props.data.image}
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
