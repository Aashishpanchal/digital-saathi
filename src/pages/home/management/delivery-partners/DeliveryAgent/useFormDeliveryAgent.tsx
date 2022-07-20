import React from "react";

export default function useFormDARetailer() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "Agent Name",
        name: "agent_name",
        defaultValue: "",
        validate: true,
        hintText: "Agent Name is compulsory",
      },
      {
        type: "email",
        label: "Email",
        name: "email_id",
        defaultValue: "",
        validate: true,
        hintText: "Email is compulsory",
      },
      {
        type: "string",
        label: "Phone Number",
        name: "phone_no",
        defaultValue: "",
      },
    ],
    []
  );
  return { getFormsFields };
}
