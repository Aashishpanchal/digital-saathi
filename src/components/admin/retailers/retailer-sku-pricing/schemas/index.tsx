import * as Yup from "yup";
import { emptyText } from "../../../../../constants/messages";

export const skuPricingSchema = Yup.object({
  sale_price: Yup.string().required(emptyText("sale price")),
});
