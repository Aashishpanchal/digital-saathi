import React from "react";

export default function useFormUnits() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "Unit Name",
        name: "units",
        defaultValue: "",
        validate: true,
        hintText: "Unit Name is compulsory",
      },
    ],
    []
  );

  return { getFormsFields };
}
