import React from "react";

export default function useLoginForm() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "Email",
        name: "email",
        defaultValue: "",
        placeholder: "example@gmail.com",
        validate: true,
        hintText: "user email is compulsory",
      },
      {
        type: "password",
        label: "password",
        name: "password",
        defaultValue: "",
        placeholder: "***********",
        validate: true,
        hintText: "password is not Empty",
      },
    ],
    []
  );
  return { getFormsFields };
}
