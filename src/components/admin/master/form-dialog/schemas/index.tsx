import * as Yup from "yup";

export const areaSchema = Yup.object({
  area: Yup.string().min(2).max(255).required("Please enter area"),
  city: Yup.string().min(2).max(255).required("Please enter city"),
  state: Yup.string().required("Please enter state"),
  country: Yup.string().required("Please enter country"),
  pincode: Yup.number().positive("pincode wrong!"),
});

export const unitSchema = Yup.object({
  units: Yup.string().min(2).max(255).required("Please enter unit name"),
});

export const packageSchema = Yup.object({
  package: Yup.string().min(2).max(255).required("Please enter package name"),
});
