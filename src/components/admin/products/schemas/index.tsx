import * as Yup from "yup";

export const productSchema = Yup.object({
  sku_name: Yup.string()
    .min(2)
    .max(255)
    .required("Please enter product sku name"),
  sku_name_kannada: Yup.string()
    .min(2)
    .max(255)
    .required("Please enter product sku name kannada"),
  sku_code: Yup.string().required("Please enter product sku code"),
  hsn_code: Yup.string().required("Please enter product hsn code"),
});

export const productPriceSchema = Yup.object({
  mrp: Yup.number().positive().required("Please enter product mrp"),
  igst: Yup.number().positive().required("Please enter product igst"),
  cgst: Yup.number().positive().required("Please enter product cgst"),
  sgst: Yup.number().positive().required("Please enter product sgst"),
  price: Yup.number().positive().required("Please enter product price"),
  weight: Yup.number().positive(),
  dimension: Yup.number().positive(),
  totalweight: Yup.number().positive(),
  units_per_case: Yup.number().positive(),
});
