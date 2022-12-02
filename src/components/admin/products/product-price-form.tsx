import React from "react";
import { useQuery } from "@tanstack/react-query";
import { NumericFormat } from "react-number-format";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { TextInput } from "../../form";
import { shopPackages, shopUnits } from "../../../http";
import AsyncAutocomplete from "../../form/async-autocomplete";

export default function ProductPriceForm(props: {
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
  const { values, handleChange, errors, handleBlur, touched, setFieldValue } =
    props;
  const [packages, setPackages] = React.useState<Array<{ [key: string]: any }>>(
    []
  );
  const [units, setUnits] = React.useState<Array<{ [key: string]: any }>>([]);

  const priceFields = React.useMemo(
    () => [
      {
        label: "MRP",
        name: "mrp",
        placeholder: "mrp",
      },
      {
        label: "GST(%)",
        name: "gst",
        placeholder: "gst",
        suffix: "%",
      },
      {
        label: "Price",
        name: "price",
        placeholder: "price",
      },
      {
        label: "Dimension",
        name: "dimension",
        placeholder: "dimension",
      },
      {
        label: "Weight",
        name: "weight",
        placeholder: "weight",
      },
      {
        label: "Actual Weight",
        name: "totalweight",
        placeholder: "actual weight",
      },
      {
        label: "Units Per Case",
        name: "units_per_case",
        placeholder: "units per case",
      },
    ],
    []
  );

  const { isLoading: packageLoading } = useQuery(
    ["get-all-package"],
    () => shopPackages("get", { params: "package" }),
    {
      onSuccess(data) {
        if (data?.status === 200)
          setPackages(data.data instanceof Array ? data.data : []);
      },
    }
  );

  useQuery(["get-all-units"], () => shopUnits("get", { params: "units" }), {
    onSuccess(data) {
      if (data?.status === 200)
        setUnits(data.data instanceof Array ? data.data : []);
    },
  });

  return (
    <Box>
      <Box>
        <Typography variant={"h6"}>Product Pricing</Typography>
        <Typography>Section to config product sales information</Typography>
      </Box>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {priceFields.map((item, index) =>
          item.name === "weight" ? (
            <>
              <NumericFormat
                {...item}
                size="small"
                key={index}
                value={values[item.name]}
                onChange={handleChange}
                error={errors[item.name] && touched[item.name] ? true : false}
                helperText={touched[item.name] ? errors[item.name] : ""}
                onBlur={handleBlur}
                customInput={TextInput}
              />
              <Box sx={{ my: 2 }}>
                <Typography
                  component={"label"}
                  sx={{ display: "block", color: "#6b7280", fontWeight: 600 }}
                >
                  Unit
                </Typography>
                <Select
                  fullWidth
                  color="secondary"
                  sx={{
                    ".MuiSelect-select": {
                      p: 1,
                    },
                  }}
                 
                  name="unit"
                  value={values.unit } 
                  onChange={handleChange as any}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem sx={{ fontSize: "small" }} value="">
                    <em>None</em>
                  </MenuItem>
                  {units.map((item, a) => (
                    <MenuItem
                      key={a}
                      sx={{ fontSize: "small" }}
                      value={item.units}
                    >
                      {item.units}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </>
          ) : (
            <NumericFormat
              {...item}
              size="small"
              key={index}
              value={values[item.name]}
              onChange={handleChange}
              error={errors[item.name] && touched[item.name] ? true : false}
              helperText={touched[item.name] ? errors[item.name] : ""}
              onBlur={handleBlur}
              customInput={TextInput}
            />
          )
        )}

        <AsyncAutocomplete
          id="package-option"
          label="Packages"
          loading={packageLoading}
          options={packages || []}
          value={values?.package}
          objFilter={{
            title: "package",
            value: "package_id",
          }}
          onChangeOption={(value) => setFieldValue("package", `${value}`)}
          TextInputProps={{
            error: errors["package"] && touched["package"] ? true : false,
            helperText: touched["package"] ? errors["package"] : "",
            onBlur: handleBlur,
          }}
        />
      </div>
    </Box>
  );
}

export const initialValues = {
  //   product price
  mrp: "",
  gst: "",
  price: "",
  weight: "",
  dimension: "",
  totalweight: "",
  units_per_case: "",
  package: "",
  unit: "",
};
