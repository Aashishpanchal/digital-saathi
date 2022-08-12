import React from "react";
import ImageInput from "../../../../components/form/inputs/ImageInput";
import useGetData from "../../../../hooks/useGetData";
import { categories } from "../../../../http";

export default function useFormCategories() {
  const [categoriesOptions, setCategoriesOptions] = React.useState<{
    [key: string]: any;
  }>({});

  const { data: categoriesData } = useGetData({
    axiosFunction: categories,
    extractKey: "categories",
  });

  const onRetrieveCategory = async () => {
    try {
      let options: any = { ...categoriesOptions };
      categoriesData.map((item: any) => {
        options[item?.category_id?.toString()] = item?.name;
      });
      setCategoriesOptions({
        ...options,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        options: categoriesOptions,
        defaultOption: {
          "0": "None",
        },
        defaultValue: "0",
      },
      {
        validate: true,
        label:
          "Drag & Drop Files But Image size should be square (500) x (500).",
        name: "image",
        hintText: "Category Image is compulsory",
        defaultValue: null,
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
    [categoriesOptions]
  );

  React.useEffect(() => {
    onRetrieveCategory();
  }, [categoriesData]);

  return { getFormsFields };
}
