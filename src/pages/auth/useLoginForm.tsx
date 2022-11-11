import React from "react";

export default function useLoginForm() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "Username",
        name: "email",
        defaultValue: "",
        placeholder: "Please Enter User Name",
        validate: true,
        hintText: "Username is compulsory",
      },
      {
        type: "password",
        label: "Password",
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
