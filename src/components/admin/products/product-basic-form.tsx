import React from "react";
import { FormikErrors } from "formik";
import { useQuery } from "@tanstack/react-query";
import { NumericFormat } from "react-number-format";
import { Box, Typography, Divider } from "@mui/material";
import { TextInput } from "../../form";
import {
  categories as categoriesHttp,
  subCategories as subCategoriesHttp,
  brands as brandsHttp,
} from "../../../http";
import AsyncAutocomplete from "../../form/async-autocomplete";
import { queryToStr } from "../utils";

export default function ProductBasicForm(props: {
  errors?: any;
  values?: any;
  touched?: any;
  handleChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  handleBlur?:
    | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          [key: string]: any;
        }>
      >;
}) {
  const { values, handleChange, errors, handleBlur, touched, setFieldValue } =
    props;
  const [brands, setBrands] = React.useState<Array<{ [key: string]: any }>>([]);
  const [categories, setCategories] = React.useState<
    Array<{ [key: string]: any }>
  >([]);
  const [subCategories, setSubCategories] = React.useState<
    Array<{ [key: string]: any }>
  >([]);

  const basicFields = React.useMemo(
    () => [
      {
        type: "text",
        label: "SKU Name",
        name: "sku_name",
        placeholder: "SKU Name",
      },
      {
        type: "text",
        label: "SKU Name Kannada",
        name: "sku_name_kannada",
        placeholder: "SKU Name Kannada",
      },
      {
        type: "text",
        label: "SKU Code",
        name: "sku_code",
        placeholder: "SKU Code",
      },
      {
        type: "numeric",
        label: "HSN Code",
        name: "hsn_code",
        placeholder: "HSN Code",
      },
      {
        type: "text",
        label: "Description",
        name: "description",
        placeholder: "Description",
        multiline: true,
        rows: 4,
      },
    ],
    []
  );

  const { isLoading: brandLoading } = useQuery(
    ["get-all-brands"],
    () => brandsHttp("get"),
    {
      onSuccess(data) {
        if (data?.status === 200)
          setBrands(data.data instanceof Array ? data.data : []);
      },
    }
  );
  const { isLoading: categoryLoading } = useQuery(
    ["get-all-categories"],
    () => categoriesHttp("get"),
    {
      onSuccess(data) {
        if (data?.status === 200)
          setCategories(data.data instanceof Array ? data.data : []);
      },
    }
  );
  const { isLoading: subcategoryLoading } = useQuery(
    ["get-all-subcategories", values.category_id],
    () =>
      subCategoriesHttp("get", {
        params: "subcategories",
        postfix: "?".concat(
          queryToStr({ category_id: values.category_id || 0 })
        ),
      }),
    {
      onSuccess(data) {
        if (data?.status === 200)
          setSubCategories(data.data instanceof Array ? data.data : []);
      },
    }
  );

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Box>
          <Typography variant={"h6"}>Basic Information</Typography>
          <Typography>Section to config basic product information</Typography>
        </Box>
        {basicFields.map((item, index) => {
          const { type, ...others } = item;
          return type === "numeric" ? (
            <NumericFormat
              key={index}
              {...others}
              value={values[item.name]}
              onChange={handleChange}
              error={errors[item.name] && touched[item.name] ? true : false}
              helperText={touched[item.name] ? errors[item.name] : ""}
              onBlur={handleBlur}
              customInput={TextInput}
            />
          ) : (
            <TextInput
              key={index}
              {...item}
              value={values[item.name] || ""}
              onChange={handleChange}
              error={errors[item.name] && touched[item.name] ? true : false}
              helperText={touched[item.name] ? errors[item.name] : ""}
              onBlur={handleBlur}
            />
          );
        })}
      </Box>
      <Divider />
      <Box sx={{ my: 2 }}>
        <Box>
          <Typography variant={"h6"}>Organizations</Typography>
          <Typography>Section to config the product attribute</Typography>
        </Box>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Box sx={{ my: 1 }}>
            <AsyncAutocomplete
              id="category-option"
              loading={categoryLoading}
              label="Category"
              options={categories || []}
              objFilter={{
                title: "name",
                value: "category_id",
              }}
              value={values?.category_id}
              onChangeOption={(value) => {
                setFieldValue("category_id", value);
                setFieldValue("subcategory_id", "");
              }}
              TextInputProps={{
                error:
                  errors["category_id"] && touched["category_id"]
                    ? true
                    : false,
                helperText: touched["category_id"] ? errors["category_id"] : "",
                onBlur: handleBlur,
              }}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <AsyncAutocomplete
              id="sub-category-option"
              loading={subcategoryLoading}
              label="Sub Category"
              options={subCategories || []}
              objFilter={{
                title: "name",
                value: "category_id",
              }}
              value={values?.subcategory_id}
              onChangeOption={(value) => setFieldValue("subcategory_id", value)}
              TextInputProps={{
                error:
                  errors["subcategory_id"] && touched["subcategory_id"]
                    ? true
                    : false,
                helperText: touched["subcategory_id"]
                  ? errors["subcategory_id"]
                  : "",
                onBlur: handleBlur,
              }}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <AsyncAutocomplete
              id="brand-option"
              loading={brandLoading}
              label="Brand"
              options={brands}
              objFilter={{
                title: "brand_name",
                value: "brand_id",
              }}
              value={values?.brand_id}
              onChangeOption={(value) => setFieldValue("brand_id", value)}
              TextInputProps={{
                error: errors["brand_id"] && touched["brand_id"] ? true : false,
                helperText: touched["brand_id"] ? errors["brand_id"] : "",
                onBlur: handleBlur,
              }}
            />
          </Box>
        </div>
      </Box>
    </Box>
  );
}

export const initialValues = {
  sku_name: "",
  sku_name_kannada: "",
  sku_code: "",
  hsn_code: "",
  description: "",
  //   organization
  category_id: "",
  subcategory_id: "",
  brand_id: "",
};
