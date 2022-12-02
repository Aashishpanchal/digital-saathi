import * as Yup from "yup";
import { emptyText, minText } from "../../../../constants/messages";

export const productSchema = Yup.object({
  sku_name: Yup.string()
    .min(2, minText("product name"))
    .max(255)
    .required(emptyText("product name")),
  sku_name_kannada: Yup.string()
    .min(2, minText("product kannada name"))
    .max(255)
    .required(emptyText("product kannada name")),

  category_id: Yup.string().required(emptyText("category")),
  subcategory_id: Yup.string().required(emptyText("subcategory")),
  brand_id: Yup.string().required(emptyText("brand")),
});

export const productPriceSchema = Yup.object({
  mrp: Yup.string().required(emptyText("product mrp")),
  gst: Yup.string().required(emptyText("product gst")),
  price: Yup.string().required(emptyText("product price")),
  package: Yup.string(),
  weight: Yup.string().required(emptyText("product weight")),
  dimension: Yup.string(),
  totalweight: Yup.string(),
  units_per_case: Yup.string(),
});
