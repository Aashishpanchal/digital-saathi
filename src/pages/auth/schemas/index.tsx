import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email()
    .required("login email is not allowed to be empty"),
  password: Yup.string().required("login password is not allowed to be empty"),
});
