import * as Yup from "yup";

export const deliveryChargeSchema = Yup.object({
  delivery_from: Yup.string().required(
    "delivery from is not allowed to be empty"
  ),
  delivery_to: Yup.string().required(
    "delivery to name is not allowed to be empty"
  ),
  delivery_charge: Yup.string().required(
    "delivery charge name is not allowed to be empty"
  ),
});
