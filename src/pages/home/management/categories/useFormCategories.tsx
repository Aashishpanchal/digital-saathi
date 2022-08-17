import React from "react";
import AsyncSelectInput from "../../../../components/form/inputs/AsyncSelectInput";
import ImageInput from "../../../../components/form/inputs/ImageInput";
import { categories } from "../../../../http";

export default function useFormCategories() {
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
        type: "select",
        label: "Parent Category",
        name: "parent_category_id",
        defaultOption: {
          "0": "None",
        },
        defaultValue: "",
        Field: (props: any) => (
          <AsyncSelectInput
            {...props}
            axiosFunction={categories}
            extractKey="categories"
            filterValue={(value) => ({
              key: `${value.category_id}`,
              value: value.name,
            })}
          />
        ),
      },
      {
        validate: true,
        label:
          "Drag & Drop Files But Image size should be square (500) x (500).",
        name: "image",
        hintText: "Category Image is compulsory",
        defaultValue: "",
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
