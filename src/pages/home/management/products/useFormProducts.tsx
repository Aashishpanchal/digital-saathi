import React from "react";
import { brands, categories, subCategories } from "../../../../http";

export default function useFormProducts(data?: any) {
  const [categoriesOptions, setCategoriesOptions] = React.useState<{
    [key: string]: any;
  }>({
    "": "Select Category",
  });
  const [subCategoriesOptions, setSubCategoriesOptions] = React.useState<{
    [key: string]: any;
  }>({
    "": "Select SubCategory",
  });
  const [brandsOptions, setBrandsOptions] = React.useState<{
    [key: string]: any;
  }>({
    "": "Select Brand",
  });

  const onRetrieveCategory = async () => {
    try {
      const res = await categories("get");
      if (res?.status === 200) {
        const { categories } = res.data;
        if (categories) {
          let options: any = {};
          categories.map((item: any) => {
            options[item?.category_id?.toString()] = item?.name;
          });
          setCategoriesOptions({
            ...categoriesOptions,
            ...options,
          });
        }
      }
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const onRetrieveSubCategory = async (id: string) => {
    try {
      const res = await subCategories("get", {
        postfix: `?category_id=${id}`,
      });
      if (res?.status === 200) {
        const { subcategories } = res.data;
        if (subcategories) {
          let options: any = {};
          subcategories.map((item: any) => {
            options[item?.category_id?.toString()] = item?.name;
          });
          setSubCategoriesOptions({
            ...subCategoriesOptions,
            ...options,
          });
        }
      }
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const onRetrieveBrand = async () => {
    try {
      const res = await brands("get");
      if (res?.status === 200) {
        const { brands } = res.data;
        if (brands) {
          let options: any = {};
          brands.map((item: any) => {
            options[item?.brand_id?.toString()] = item?.brand_name;
          });
          setBrandsOptions({
            ...brandsOptions,
            ...options,
          });
        }
      }
    } catch (err: any) {
      console.log(err.response);
    }
  };

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
        options: categoriesOptions,
        onChange: async (e: any) => {
          await onRetrieveSubCategory(e.target.value);
        },
        defaultValue: "",
      },
      {
        type: "select",
        label: "Sub Category",
        name: "subcategory_id",
        options: subCategoriesOptions,
        defaultValue: "",
      },
      {
        type: "select",
        label: "Brand",
        name: "brand_id",
        options: brandsOptions,
        defaultValue: "",
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
    [categoriesOptions, subCategoriesOptions, brandsOptions]
  );

  React.useEffect(() => {
    onRetrieveCategory();
    onRetrieveBrand();
  }, []);

  return { getFormsFields };
}
