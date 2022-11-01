import React from "react";
import { Box, Typography, Divider, Select, MenuItem } from "@mui/material";
import { TextInput } from "../../form";
import {
  categories as categoriesHttp,
  subCategories as subCategoriesHttp,
  brands as brandsHttp,
} from "../../../http";
import { FormikErrors } from "formik";
import AsyncAutocomplete from "../../form/async-autocomplete";

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
  const [categories, setCategories] = React.useState<
    Array<{ [key: string]: any }>
  >([]);
  const [subCategories, setSubCategories] = React.useState<
    Array<{ [key: string]: any }>
  >([]);
  const [brands, setBrands] = React.useState<Array<{ [key: string]: any }>>([]);

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
        type: "number",
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

  const categoriesGet = React.useCallback(async () => {
    try {
      let res = await categoriesHttp("get");
      if (res?.status === 200) {
        let {
          data: { totalItems, categories, totalPages },
        } = res;

        if (totalPages > 1) {
          res = await categoriesHttp("get", {
            postfix: `?page=0&size=${totalItems}`,
          });
          if (res?.status === 200) {
            let {
              data: { categories },
            } = res;
            return setCategories(categories);
          }
        }
        return setCategories(categories);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const subCategoriesGet = React.useCallback(async (category_id: string) => {
    if (category_id) {
      try {
        let res = await subCategoriesHttp("get", {
          postfix: `?category_id=${category_id}`,
        });
        if (res?.status === 200) {
          let {
            data: { totalItems, subcategories, totalPages },
          } = res;

          if (totalPages > 1) {
            res = await subCategoriesHttp("get", {
              postfix: `?category_id=${category_id}&page=0&size=${totalItems}`,
            });
            if (res?.status === 200) {
              let {
                data: { subcategories },
              } = res;
              return setSubCategories(subcategories);
            }
          }
          return setSubCategories(subcategories);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return setSubCategories([]);
    }
  }, []);

  const brandsGet = React.useCallback(async () => {
    try {
      let res = await brandsHttp("get");
      if (res?.status === 200) {
        let {
          data: { totalItems, brands, totalPages },
        } = res;

        if (totalPages > 1) {
          res = await brandsHttp("get", {
            postfix: `?page=0&size=${totalItems}`,
          });
          if (res?.status === 200) {
            let {
              data: { brands },
            } = res;
            return setBrands(brands);
          }
        }
        return setBrands(brands);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    categoriesGet();
    subCategoriesGet(values.category_id);
    brandsGet();
  }, [values.category_id]);

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Box>
          <Typography variant={"h6"}>Basic Information</Typography>
          <Typography>Section to config basic product information</Typography>
        </Box>
        {basicFields.map((item, index) => (
          <TextInput
            key={index}
            {...item}
            value={values[item.name] || ""}
            onChange={handleChange}
            error={errors[item.name] && touched[item.name] ? true : false}
            helperText={touched[item.name] ? errors[item.name] : ""}
            onBlur={handleBlur}
          />
        ))}
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
              id="sub-category-option"
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
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <AsyncAutocomplete
              id="sub-category-option"
              label="Sub Category"
              options={subCategories || []}
              objFilter={{
                title: "name",
                value: "category_id",
              }}
              value={values?.subcategory_id}
              onChangeOption={(value) => setFieldValue("subcategory_id", value)}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <AsyncAutocomplete
              id="brand-option"
              label="Brand"
              options={brands || []}
              objFilter={{
                title: "brand_name",
                value: "brand_id",
              }}
              value={values?.brand_id}
              onChangeOption={(value) => setFieldValue("brand_id", value)}
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
