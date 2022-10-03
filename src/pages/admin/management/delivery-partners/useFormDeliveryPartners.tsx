import React from "react";

export default function useFormDeliveryPartners() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "Partner Name",
        name: "partner_name",
        defaultValue: "",
        validate: true,
        hintText: "Partner Name is compulsory",
      },
      {
        type: "string",
        label: "Zone Name",
        name: "zone_name",
        defaultValue: "",
      },
      {
        type: "string",
        label: "Erp Code",
        name: "erp_code",
        defaultValue: "",
      },
      {
        type: "string",
        label: "Phone No",
        name: "phone_no",
        defaultValue: "",
      },
      {
        type: "email",
        label: "Email ID",
        name: "email_id",
        defaultValue: "",
        validate: true,
        hintText: "Email Id is compulsory",
      },
      {
        type: "string",
        label: "Address",
        name: "address",
        defaultValue: "",
      },
      {
        type: "string",
        label: "State",
        name: "state",
        defaultValue: "",
      },
      {
        type: "string",
        label: "District",
        name: "district",
        defaultValue: "",
      },
      {
        type: "string",
        label: "City",
        name: "city",
        defaultValue: "",
      },
      {
        type: "string",
        label: "Pin-code",
        name: "pincode",
        defaultValue: "",
      },
      {
        type: "string",
        label: "Sub-zone ID",
        name: "subzone_id",
        defaultValue: "",
      },
    ],
    []
  );

  return { getFormsFields };
}
