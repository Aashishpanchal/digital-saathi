import React from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { TextInput } from "../../form";
import { shopPackages, shopUnits } from "../../../http";
import { NumericFormat } from "react-number-format";
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
      },
      {
        label: "GST(%)",
        name: "gst",
        suffix: "%",
      },
      // {
      //   type: "number",
      //   label: "IGST(%)",
      //   name: "igst",
      // },
      // {
      //   type: "number",
      //   label: "CGST(%)",
      //   name: "cgst",
      // },
      // {
      //   type: "number",
      //   label: "SGST(%)",
      //   name: "sgst",
      // },
      {
        label: "Price",
        name: "price",
      },
      {
        label: "Dimension",
        name: "dimension",
      },
      {
        label: "Total Weight",
        name: "totalweight",
      },
      {
        label: "Units Per Case",
        name: "units_per_case",
      },
      {
        label: "Weight",
        name: "weight",
      },
    ],
    []
  );

  const packagesGet = React.useCallback(async () => {
    try {
      let res = await shopPackages("get");
      if (res?.status === 200) {
        let { data } = res;

        if (data.totalPages > 1) {
          res = await shopPackages("get", {
            postfix: `?page=0&size=${data.totalItems}`,
          });
          if (res?.status === 200) {
            let { data } = res;
            return setPackages(data.packages);
          }
        }
        return setPackages(data.packages);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const unitsGet = React.useCallback(async () => {
    try {
      let res = await shopUnits("get");
      if (res?.status === 200) {
        let { data } = res;

        if (data.totalPages > 1) {
          res = await shopUnits("get", {
            postfix: `?page=0&size=${data.totalItems}`,
          });
          if (res?.status === 200) {
            let { data } = res;
            return setUnits(data.units);
          }
        }
        return setUnits(data.units);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    packagesGet();
    unitsGet();
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant={"h6"}>Product Pricing</Typography>
        <Typography>Section to config product sales information</Typography>
      </Box>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {priceFields.map((item, index) => (
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
        ))}
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
            value={values.unit}
            onChange={handleChange as any}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem sx={{ fontSize: "small" }} value="">
              <em>None</em>
            </MenuItem>
            {units.map((item, index) => (
              <MenuItem
                key={index}
                sx={{ fontSize: "small" }}
                value={item.units}
              >
                {item.units}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <AsyncAutocomplete
          id="package-option"
          label="Packages"
          options={packages || []}
          value={
            values?.package
              ? !isNaN(Number(values?.package))
                ? Number(values?.package)
                : undefined
              : undefined
          }
          objFilter={{
            title: "package",
            value: "package_id",
          }}
          onChangeOption={(value) => setFieldValue("package", value.toString())}
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
