import * as Yup from "yup";

export const deliveryPartnerSchema = Yup.object({
  partner_name: Yup.string()
    .min(2)
    .max(255)
    .required("Please enter partner name"),
  phone_no: Yup.string().matches(
    /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/,
    {
      message: "Invalid Phone number",
      excludeEmptyString: false,
    }
  ),
  email_id: Yup.string().email().required("Please enter partner email id"),
  pincode: Yup.number()
    .positive("wrong pincode")
    .required("Please enter pincode"),
});

export const deliveryAgentSchema = Yup.object({
  agent_name: Yup.string().min(2).max(255).required("Please enter agent name"),
  email_id: Yup.string().email().required("Please enter agent email id"),
  phone_no: Yup.string()
    .matches(
      /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/,
      {
        message: "Invalid Phone number",
        excludeEmptyString: false,
      }
    )
    .required("Please enter phone number"),
});
