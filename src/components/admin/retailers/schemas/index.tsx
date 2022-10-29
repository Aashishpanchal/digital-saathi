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
  phone_no: Yup.string().matches(/[6-9]{1}[0-9 ]{4}[0-9 ]{4}[0-9]{3}/, {
    message: "Invalid Indian number, follow(+91 6-9 0-9 0-9)",
    excludeEmptyString: false,
  }),
  pincode: Yup.number()
    .positive("wrong pincode")
    .required("Please enter pincode"),
});
