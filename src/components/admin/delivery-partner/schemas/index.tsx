import * as Yup from "yup";

export const deliveryPartnerSchema = Yup.object({
  partner_name: Yup.string()
    .min(2)
    .max(255)
    .required("Please enter partner name"),
  phone_no: Yup.string().matches(/(\+91\ )[6-9]{1}[0-9 ]{4}[0-9 ]{4}[0-9]{3}/, {
    message: "Invalid Indian number, follow(+91 915 689 4565)",
    excludeEmptyString: false,
  }),
  email_id: Yup.string().email().required("Please enter partner email id"),
  pincode: Yup.number()
    .positive("wrong pincode")
    .required("Please enter pincode"),
});

export const deliveryAgentSchema = Yup.object({
  agent_name: Yup.string().min(2).max(255).required("Please enter agent name"),
  email_id: Yup.string().email().required("Please enter agent email id"),
  phone_no: Yup.string()
    .matches(/(\+91\ )[6-9]{1}[0-9 ]{4}[0-9 ]{4}[0-9]{3}/, {
      message: "Invalid Indian number, follow(+91 915 689 4565)",
      excludeEmptyString: false,
    })
    .required("Please enter phone number"),
});
