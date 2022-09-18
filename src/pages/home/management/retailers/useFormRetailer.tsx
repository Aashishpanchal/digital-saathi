import React from "react";

export default function useFormRetailer() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "Auth0 Code",
        name: "auth_code",
        defaultValue: "",
        validate: true,
        hintText: "Auth0 Code is compulsory",
      },
      {
        type: "string",
        label: "Retailer Name",
        name: "retailer_name",
        defaultValue: "",
        validate: true,
        hintText: "Partner Name is compulsory",
      },
      {
        type: "string",
        label: "Email",
        name: "email_id",
        defaultValue: "",
        validate: true,
        hintText: "Email ID is compulsory",
      },
      {
        type: "string",
        label: "Phone Number",
        name: "phone_no",
        defaultValue: "",
      },
      {
        type: "string",
        label: "Zone Name",
        name: "zone_name",
        defaultValue: "",
      },
      {
        type: "string",
        label: "ERP Name",
        name: "erp_code",
        defaultValue: "",
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
        label: "Pin-Code",
        name: "pincode",
        defaultValue: "",
        validate: true,
        hintText: "Pin-Code is compulsory",
      },
      {
        type: "string",
        label: "Jurisdiction",
        name: "jurisdiction",
        defaultValue: "",
      },
      {
        type: "string",
        label: "Terms & Conditions",
        name: "terms_conditions",
        defaultValue: "",
      },
      {
        type: "string",
        label: "Pan No",
        name: "pan_no",
        defaultValue: "",
      },
      {
        type: "string",
        label: "Default Credit Limit",
        name: "default_credit_limit",
        defaultValue: "",
      },
      {
        type: "string",
        label: "Default Credit Period",
        name: "default_credit_period",
        defaultValue: "",
      },
      {
        type: "string",
        label: "Subzone ID",
        name: "subzone_id",
        defaultValue: "",
      },
    ],
    []
  );

  return { getFormsFields };
}
