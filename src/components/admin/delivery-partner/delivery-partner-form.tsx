import React from "react";
import { Box, Typography } from "@mui/material";
import { TextInput } from "../../form";

export default function DeliveryPartnerForm(props: {
  errors?: any;
  values?: any;
  touched?: any;
  handleChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  handleBlur?:
    | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}) {
  const { values, handleChange, errors, handleBlur, touched } = props;
  const basicFields = React.useMemo(
    () => [
      {
        type: "text",
        label: "Partner Name",
        name: "partner_name",
      },
      {
        type: "email",
        label: "Email",
        name: "email_id",
      },
      {
        type: "text",
        label: "Phone Number",
        name: "phone_no",
      },
      {
        type: "text",
        label: "Zone Name",
        name: "zone_name",
      },
      {
        type: "text",
        label: "ERP Name",
        name: "erp_code",
      },
    ],
    []
  );

  const addressFields = React.useMemo(
    () => [
      {
        type: "text",
        label: "City",
        name: "city",
      },
      {
        type: "text",
        label: "State",
        name: "state",
      },
      {
        type: "text",
        label: "District",
        name: "district",
      },
      {
        type: "number",
        label: "Pin-Code",
        name: "pincode",
      },
      {
        type: "number",
        label: "Sub-zone ID",
        name: "subzone_id",
      },
    ],
    []
  );

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Box>
          <Typography variant={"h6"}>Basic Information</Typography>
          <Typography>
            Section to config basic Delivery Partner information
          </Typography>
        </Box>
        {basicFields.map((item, index) => (
          <TextInput
            key={index}
            {...item}
            value={values[item.name] || ""}
            onChange={handleChange}
            error={errors[item.name] && touched[item.name] ? true : false}
            helperText={touched[item.name] ? errors[item.name] : ""}
            onBlur={handleBlur}
          />
        ))}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Box>
          <Typography variant={"h6"}>Partner Address</Typography>
          <Typography>
            Section to config Delivery Partner address information
          </Typography>
        </Box>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {addressFields.map((item, index) => (
            <TextInput
              key={index}
              {...item}
              value={values[item.name] || ""}
              onChange={handleChange}
              error={errors[item.name] && touched[item.name] ? true : false}
              helperText={touched[item.name] ? errors[item.name] : ""}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <TextInput
          type="text"
          label="Address"
          name="address"
          value={values.address}
          onChange={handleChange}
          error={errors.address && touched.address ? true : false}
          helperText={touched.address ? errors.address : ""}
          onBlur={handleBlur}
          multiline
          rows={4}
        />
      </Box>
    </Box>
  );
}

export const initialValues = {
  partner_name: "",
  email_id: "",
  phone_no: "+91 ",
  zone_name: "",
  erp_code: "",
  address: "",
  state: "",
  district: "",
  city: "",
  pincode: "",
  subzone_id: "",
};
