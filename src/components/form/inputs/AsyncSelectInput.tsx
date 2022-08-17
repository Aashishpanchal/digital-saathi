import React from "react";
import useGetData from "../../../hooks/useGetData";
import LabelTextInput from "../LabelTextInput";

type Data = { [key: string]: any };

function AsyncSelectInput(props: {
  axiosFunction: Function;
  extractKey: string;
  filterValue: (data: Data) => Data;
  label?: string;
  name?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  hintColor?: "green" | "red" | "base";
  required?: boolean;
  defaultOption?: { [key: string]: any };
  postfix?: string;
  callback?: (value: { [key: string]: any }) => void;
}) {
  const { getAllData } = useGetData();
  const { axiosFunction, extractKey, filterValue, postfix } = props;
  const [options, setOptions] = React.useState<Data>({});

  const getNow = React.useCallback(async () => {
    const res = await getAllData(
      axiosFunction,
      extractKey,
      filterValue,
      postfix,
      (value) => {
        setOptions((prev) => ({ ...prev, ...value }));
      }
    );
    if (props.callback) {
      props.callback(res);
    }
  }, []);

  React.useEffect(() => {
    getNow();
  }, [getNow]);

  return (
    <LabelTextInput
      type="select"
      value={props.value}
      name={props.name}
      label={props.label}
      onChange={props.onChange}
      hint={props.hint}
      hintColor={props.hintColor}
      options={options}
      defaultOption={props.defaultOption}
    />
  );
}

export default React.memo(AsyncSelectInput);
