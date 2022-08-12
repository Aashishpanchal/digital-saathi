import React from "react";
import ImageInput from "../../../../../components/form/inputs/ImageInput";

export default function useFormProductImages() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "Title",
        name: "title",
        defaultValue: "",
        validate: true,
        hintText: "Title is compulsory",
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
    ],
    []
  );

  return { getFormsFields };
}
