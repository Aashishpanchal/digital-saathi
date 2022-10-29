import * as Yup from "yup";

export const skuPricingSchema = Yup.object({
  sale_price: Yup.number().positive().required(),
});
