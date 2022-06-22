import React from "react";

export default function useValidation(fields: Array<string>) {
  const [isValid, setIsValid] = React.useState(false);
  const [validFields, setValidFields] = React.useState(null);

  const checkValidate = (data: any) => {
    fields.forEach((field) => {
      if (data[field] === "") {
        setIsValid(false);
      }
    });
  };

  React.useEffect(() => {
    if (fields) {
      const defaultValidFields: any = {};
      fields.forEach((field) => {
        defaultValidFields[field] = true;
      });
      setValidFields(defaultValidFields);
    }
  }, []);

  return { isValid, validFields, checkValidate };
}
