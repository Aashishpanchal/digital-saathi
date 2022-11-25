import * as Yup from "yup";
import { emptyText } from "../../../../../constants/messages";

export const areaSchema = Yup.object({
  area: Yup.string().required(emptyText("area")),
  city: Yup.string().required(emptyText("city")),
  state: Yup.string().required(emptyText("state")),
  country: Yup.string().required(emptyText("country")),
  pincode: Yup.string().required(emptyText("pincode")),
});

export const unitSchema = Yup.object({
  units: Yup.string().required(emptyText("unit name")),
});

export const packageSchema = Yup.object({
  package: Yup.string().required(emptyText("package name")),
});

export const reasonSchema = Yup.object({
  reason_name: Yup.string().required(emptyText("reason name")),
  reason_type: Yup.string().required(emptyText("reason type")),
});
