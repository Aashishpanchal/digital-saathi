import * as Yup from "yup";

const moveOrdersSchemas = {
  "0": Yup.object({}),
  "1": Yup.object({}),
  "3": Yup.object({
    partner_id: Yup.string().required("partner is not allowed to be empty"),
    agent_id: Yup.string().required("agent is not allowed to be empty"),
  }),
  "4": Yup.object({}),
  "5": Yup.object({}),
  "6": Yup.object({}),
  "7": Yup.object({}),
  "8": Yup.object({}),
  "9": Yup.object({}),
  "10": Yup.object({}),
};

export default moveOrdersSchemas;
