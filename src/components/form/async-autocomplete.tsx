import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { styled, SxProps, Theme } from "@mui/material";

const CustomInput = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    border: "none",
    "&:focus": {
      boxShadow: "none",
    },
  },
}));

export default function AsyncAutocomplete(props: {
  loading?: boolean;
  options: Array<Record<string, any>>;
  objFilter: {
    title: string;
    value: string;
  };
  label: string;
  value?: number;
  id: string;
  onChangeOption: (value: any, values?: Record<string, any>) => void;
  TextInputProps?: {
    error?: boolean;
    helperText?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  };
  sx?: SxProps<Theme>;
}) {
  const {
    value: valueOption,
    onChangeOption,
    TextInputProps,
    objFilter,
    options,
    loading,
    label,
    id,
    sx,
  } = props;

  const v = React.useMemo(() => {
    if (typeof valueOption === "number") {
      const a = options.filter(
        (values) => values?.[objFilter.value] === valueOption
      )[0];
      if (a) {
        return a;
      }
    } else if (typeof valueOption === "string") {
      const num = parseInt(valueOption);
      if (!isNaN(num)) {
        const a = options.filter(
          (values) => values?.[objFilter.value] === num
        )[0];
        if (a) {
          return a;
        }
      }
    }
    return null;
  }, [valueOption, options]);

  return (
    <Autocomplete
      id={id}
      value={v}
      onChange={(e, n) => onChangeOption(n !== null ? n[objFilter.value] : "")}
      getOptionLabel={(option) => option[objFilter.title]}
      options={options}
      loading={loading}
      size="small"
      fullWidth
      sx={sx}
      renderInput={(params) => (
        <CustomInput
          {...params}
          {...TextInputProps}
          color="secondary"
          label={label}
          InputLabelProps={{
            color: "secondary",
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option[objFilter.title], inputValue, {
          insideWords: true,
        });
        const parts = parse(option[objFilter.title], matches);

        return (
          <li {...props} key={option[objFilter.value]}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
}
