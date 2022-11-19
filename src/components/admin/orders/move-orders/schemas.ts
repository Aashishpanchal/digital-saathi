import * as Yup from "yup";
import { emptyText } from "../../../../constants/messages";

const moveOrdersSchemas = {
  "0": Yup.object({}),
  "1": Yup.object({}),
  "3": Yup.object({
    partner_id: Yup.number().required(emptyText("partner")),
    agent_id: Yup.number(),
  }),
  "4": Yup.object({}),
  "5": Yup.object({}),
  "6": Yup.object({}),
  "7": Yup.object({
    reason_id: Yup.number().required(emptyText("reason")),
    other_reason: Yup.string().min(2).required(emptyText("other reason")),
  }),
  "8": Yup.object({}),
  "9": Yup.object({
    reason_id: Yup.number().required(emptyText("reason")),
    other_reason: Yup.string().min(2).required(emptyText("other reason")),
  }),
  "10": Yup.object({
    reason_id: Yup.number().required(emptyText("reason")),
    other_reason: Yup.string().min(2).required(emptyText("other reason")),
  }),
};

export default moveOrdersSchemas;
