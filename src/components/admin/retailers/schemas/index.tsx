import * as Yup from "yup";

export const retailerSchema = Yup.object({
  retailer_name: Yup.string()
    .min(2)
    .max(255)
    .required("Please enter retailer name"),
  company_name: Yup.string()
    .min(2)
    .max(255)
    .required("Please enter company name"),
  email_id: Yup.string().email().required("Please enter retailer email id"),
  phone_no: Yup.string().matches(
    /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/,
    {
      message: "Invalid Phone number",
      excludeEmptyString: false,
    }
  ),
  pincode: Yup.number()
    .positive("wrong pincode")
    .required("Please enter pincode"),
});
