import React from "react";
import AsyncSelectInput from "../../../../components/form/inputs/AsyncSelectInput";
import LabelTextInput from "../../../../components/form/LabelTextInput";
import useGetData from "../../../../hooks/useGetData";
import { brands, categories, subCategories } from "../../../../http";

const CatSubField = (props: {
  data: { [key: string]: any };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { data, onChange } = props;
  const { getAllData } = useGetData();
  const [subCategoryOptions, setSubCategoriesOptions] = React.useState({});

  const onRetrieveSubCategory = React.useCallback(async () => {
    await getAllData(
      subCategories,
      "subcategories",
      (value) => ({
        key: value.category_id,
        value: value.name,
      }),
      `category_id=${data.category_id}`,
      (value) => {
        setSubCategoriesOptions(value);
      }
    );
  }, [getAllData, data.category_id]);

  React.useEffect(() => {
    if (data.category_id) {
      onRetrieveSubCategory();
    } else {
      setSubCategoriesOptions([]);
    }
  }, [data.category_id, onRetrieveSubCategory]);

  return (
    <>
      <AsyncSelectInput
        value={data.category_id}
        onChange={onChange}
        name="category_id"
        label="Category"
        axiosFunction={categories}
        extractKey="categories"
        defaultOption={{
          "": "Select Category",
        }}
        filterValue={(value) => ({
          key: value.category_id,
          value: value.name,
        })}
      />
      <LabelTextInput
        type={"select"}
        value={data.subcategory_id}
        onChange={onChange}
        label="Sub Category"
        name="subcategory_id"
        defaultOption={{
          "": "Select Sub Category",
        }}
        options={subCategoryOptions}
      />
    </>
  );
};

export default function useFormProducts() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "SKU Name",
        name: "sku_name",
        defaultValue: "",
        validate: true,
        hintText: "SKU Name is compulsory",
      },
      {
        type: "string",
        label: "SKU Name Kannada",
        name: "sku_name_kannada",
        defaultValue: "",
        validate: true,
        hintText: "SKU Name Kannada is compulsory",
      },
      {
        type: "string",
        label: "SKU Code",
        name: "sku_code",
        defaultValue: "",
        validate: true,
        hintText: "SKU Code is compulsory",
      },
      {
        type: "select",
        label: "Category",
        name: "category_id",
        defaultOption: {
          "": "Select Category",
        },
        onAllReset: () => ({
          subcategory_id: "",
          category_id: "",
        }),
        Field: (props: any) => (
          <CatSubField data={props.data} onChange={props.onChange} />
        ),
      },
      {
        type: "select",
        label: "Brand",
        name: "brand_id",
        defaultOption: {
          "": "Select Brand",
        },
        Field: (props: any) => (
          <AsyncSelectInput
            {...props}
            axiosFunction={brands}
            extractKey="brands"
            filterValue={(value) => ({
              key: value.brand_id.toString(),
              value: value.brand_name,
            })}
          />
        ),
      },
      {
        type: "string",
        label: "HSN Code",
        name: "hsn_code",
        defaultValue: "",
        validate: true,
        hintText: "HSN Code is compulsory",
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
