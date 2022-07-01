import React from "react";

interface FieldsType {
  name: string;
  validation?: (value: any) => { error: boolean; hintText?: string };
  onReset?: (value: any) => any;
  onAllReset?: (data?: any) => { [key: string]: any };
  validate?: boolean;
  hintText?: string;
  defaultValue: any;
}

export default function useForms(props: {
  fields: Array<FieldsType>;
  setDefaultValue?: { [key: string]: any };
}) {
  const setValue = () => {
    let values: any = {};
    props.fields.forEach((item) => {
      values[item.name as any] = item.defaultValue;
    });
    if (props.setDefaultValue) {
      return {
        ...values,
        ...props.setDefaultValue,
      };
    }
    return values;
  };
  const [data, setData] = React.useState<any>(setValue());
  const [errors, setErrors] = React.useState<any>({});

  const onClear = () => {
    // than run reset function
    let resetValue: any = {};
    props.fields.map((item) => {
      if (typeof item.onReset === "function") {
        const result = item.onReset(data[item.name]);
        resetValue[item.name] =
          typeof result === "undefined" ? item.defaultValue || "" : result;
      }
      if (typeof item.onAllReset === "function") {
        const result = item.onAllReset(data);
        Object.keys(result).map((key) => {
          resetValue[key] = result[key];
        });
      } else {
        resetValue[item.name] = item.defaultValue;
      }
    });
    setData({
      ...data,
      ...resetValue,
    });

    // reset errors
    let validateValue: any = {};
    Object.keys(errors).forEach((name: any) => {
      validateValue[name] = {
        error: false,
        hintText: props.fields[name]?.hintText || "",
      };
    });
    setErrors(validateValue);
  };

  const onValidate = () => {
    let validateValue: any = {};
    let isValid = true;
    props.fields.forEach((item) => {
      if (item.validate) {
        if (
          data[item.name] === "" ||
          data[item.name] === null ||
          data[item.name] === undefined
        ) {
          validateValue[item.name] = {
            error: true,
            hintText: item.hintText
              ? item.hintText
              : `"${item.name}" is compulsory`,
          };
          isValid = false;
          return;
        }
        if (typeof item.validation === "function") {
          const { error, hintText } = item.validation(data[item.name]);
          if (error) {
            validateValue[item.name] = {
              error,
              hintText: hintText ? hintText : `"${item.name}" is compulsory`,
            };
            isValid = false;
          }
        }
      }
    });
    setErrors(validateValue);
    return isValid;
  };

  React.useEffect(() => {
    if (data) {
      let validateValue: any = {};
      Object.keys(errors).forEach((name: any) => {
        validateValue[name] = {
          error: false,
          hintText: props.fields[name]?.hintText || "",
        };
      });
      setErrors(validateValue);
    }
  }, [data]);

  return { data, setData, onClear, onValidate, errors };
}
