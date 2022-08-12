import React from "react";

export default function useFormPackages() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "Package Name",
        name: "package",
        defaultValue: "",
        validate: true,
        hintText: "Package Name is compulsory",
      },
    ],
    []
  );

  return { getFormsFields };
}
