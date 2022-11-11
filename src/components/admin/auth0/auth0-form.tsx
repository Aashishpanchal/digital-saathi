import React from "react";

export default function Auth0Form(props: {
  errors?: any;
  values?: any;
  touched?: any;
  handleChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  handleBlur?:
    | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  setFieldValue: Function;
}) {
  const baseFields = React.useMemo(
    () => [
      {
        label: "Email",
        name: "email",
        placeholder: "example@gmail.com",
      },
      {
        label: "Name",
        name: "name",
        placeholder: "your name",
      },
      {
        label: "Nick Name",
        name: "nick_name",
        placeholder: "your nick name",
      },
    ],
    []
  );
  return <div>Auth0Form</div>;
}
