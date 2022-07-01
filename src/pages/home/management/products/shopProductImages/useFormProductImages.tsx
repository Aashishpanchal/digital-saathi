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
        Field: (props: any) => {
          return (
            <ImageInput
              label={props.label}
              handleChange={(file: any) => {
                props.setData({ ...props.data, image: file });
              }}
              file={props.data.image}
              imageMiddleUri="product-images/small-images/"
            />
          );
        },
      },
    ],
    []
  );

  return { getFormsFields };
}
