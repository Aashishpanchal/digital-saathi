import React from "react";
import useGetData from "../../../../hooks/useGetData";
import { brands, categories, subCategories } from "../../../../http";

export default function useFormProducts() {
  const [categoriesOptions, setCategoriesOptions] = React.useState<{
    [key: string]: any;
  }>({});
  const [subCategoriesOptions, setSubCategoriesOptions] = React.useState<{
    [key: string]: any;
  }>({});
  const [brandsOptions, setBrandsOptions] = React.useState<{
    [key: string]: any;
  }>({});

  const { data: categoriesData } = useGetData({
    axiosFunction: categories,
    extractKey: "categories",
  });

  const { data: brandsData } = useGetData({
    axiosFunction: brands,
    extractKey: "brands",
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
      let options: any = { ...brandsOptions };
      brandsData.map((item: any) => {
        options[item?.brand_id?.toString()] = item?.brand_name;
      });
      setBrandsOptions({
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
        defaultOption: {
          "": "Select Category",
        },
        defaultValue: "",
      },
      {
        type: "select",
        label: "Sub Category",
        name: "subcategory_id",
        options: subCategoriesOptions,
        defaultOption: {
          "": "Select SubCategory",
        },
        defaultValue: "",
      },
      {
        type: "select",
        label: "Brand",
        name: "brand_id",
        options: brandsOptions,
        defaultOption: {
          "": "Select Brand",
        },
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
  }, [categoriesData]);

  React.useEffect(() => {
    onRetrieveBrand();
  }, [brandsData]);

  return { getFormsFields, onRetrieveSubCategory };
}
