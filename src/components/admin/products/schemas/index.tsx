import * as Yup from "yup";

export const productSchema = Yup.object({
  sku_name: Yup.string()
    .min(2, "product name must be at least 2 characters")
    .max(255)
    .required("product name is not allowed to be empty"),
  sku_name_kannada: Yup.string()
    .min(2, "product kannada name must be at least 2 characters")
    .max(255)
    .required("product kannada name is not allowed to be empty"),

  category_id: Yup.string().required("category is not allowed to be empty"),
  subcategory_id: Yup.string().required(
    "subcategory is not allowed to be empty"
  ),
  brand_id: Yup.string().required("brand is not allowed to be empty"),
});

export const productPriceSchema = Yup.object({
  mrp: Yup.string().required("product mrp is not allowed to be empty"),
  gst: Yup.string().required("product gst is not allowed to be empty"),
  price: Yup.string().required("product price is not allowed to be empty"),
  package: Yup.string().required("package is not allowed to be empty"),
  weight: Yup.string(),
  dimension: Yup.string(),
  totalweight: Yup.string(),
  units_per_case: Yup.string(),
});
