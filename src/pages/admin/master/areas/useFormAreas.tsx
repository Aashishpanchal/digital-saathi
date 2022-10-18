import React from "react";

export default function useFormAreas() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "Area",
        name: "area",
        defaultValue: "",
        validate: true,
        hintText: "Area Name is compulsory",
      },
      {
        type: "string",
        label: "City",
        name: "city",
        defaultValue: "",
        validate: true,
        hintText: "City Name is compulsory",
      },
      {
        type: "string",
        label: "State",
        name: "state",
        defaultValue: "",
        validate: true,
        hintText: "State Name is compulsory",
      },
      {
        type: "string",
        label: "Country",
        name: "country",
        defaultValue: "",
        validate: true,
        hintText: "Country Name is compulsory",
      },
      {
        type: "number",
        label: "Pin-code",
        name: "pincode",
        defaultValue: "",
        validate: true,
        hintText: "Pin-code Name is compulsory",
        maxLength: 6,
        validation: (value: string) => {
          const num = Number(value);
          if (isNaN(num)) {
            return { error: true, hintText: "you only add numeric value" };
          }
          if (!Number.isInteger(num)) {
            return { error: true, hintText: "you cannot add float value" };
          }
          return { error: false };
        },
      },
    ],
    []
  );

  return { getFormsFields };
}
