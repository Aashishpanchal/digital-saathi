import React from "react";
import AsyncSelectInput from "../../../../../components/form/inputs/AsyncSelectInput";
import LabelTextInput from "../../../../../components/form/LabelTextInput";
import { removePostFix } from "../../../../../components/Utils";
import { shopPackages, shopUnits } from "../../../../../http";

export default function useFormShopProductsWeightPrice() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "number",
        label: "MRP",
        name: "mrp",
        defaultValue: "",
        validate: true,
        hintText: "MRP is compulsory",
      },
      {
        type: "number",
        label: "IGST",
        name: "igst",
        defaultValue: "",
        validate: true,
        hintText: "IGST is compulsory",
      },
      {
        type: "number",
        label: "CGST Code",
        name: "cgst",
        defaultValue: "",
        validate: true,
        hintText: "CGST is compulsory",
      },
      {
        type: "number",
        label: "SGST",
        name: "sgst",
        defaultValue: "",
        validate: true,
        hintText: "sgst is compulsory",
      },
      {
        type: "number",
        label: "Price",
        name: "price",
        defaultValue: "",
        validate: true,
        hintText: "price is compulsory",
      },
      {
        type: "string",
        label: "Weight",
        name: "weight",
        defaultValue: "",
        hintText: "Weight & Units both are compulsory",
        onAllReset: () => ({
          weight: "",
          weightUnit: "",
        }),
        validation: (value: any, data: any) => {
          if (!value || !data.weightUnit) {
            return {
              error: true,
              hintText: "Weight & Units both are compulsory",
            };
          }
          return { error: false };
        },
        validate: true,
        Field: (props: any) => (
          <>
            <div className="flex items-center md:justify-between flex-wrap">
              <div className="w-full md:w-fit">
                <LabelTextInput
                  type={"text"}
                  label="Weight"
                  name="weight"
                  value={removePostFix(props.data.weight || "")[0]}
                  onChange={(e) => {
                    props.setData({ ...props.data, weight: e.target.value });
                  }}
                  hintColor={props.hintColor}
                />
              </div>
              <div className="md:mt-5 w-full md:w-1/2">
                <AsyncSelectInput
                  name="units"
                  value={props.data.weightUnit}
                  onChange={(e) => {
                    props.setData({
                      ...props.data,
                      weightUnit: e.target.value,
                    });
                  }}
                  axiosFunction={shopUnits}
                  extractKey="units"
                  defaultOption={{ "": "Select Units" }}
                  filterValue={(value) => ({
                    key: `${value.units}`,
                    value: value.units,
                  })}
                  hintColor={props.hintColor}
                />
              </div>
            </div>
            <p className="text-red-500 text-sm">{props.hint}</p>
          </>
        ),
      },
      {
        type: "select",
        label: "Package",
        name: "package",
        defaultOption: {
          "": "Select Package",
        },
        defaultValue: "",
        validate: true,
        hintText: "Package is compulsory",
        Field: (props: any) => (
          <AsyncSelectInput
            {...props}
            axiosFunction={shopPackages}
            extractKey="packages"
            filterValue={(value) => ({
              key: value.package_id,
              value: value.package,
            })}
          />
        ),
      },
      {
        type: "number",
        label: "Dimension",
        name: "dimension",
        defaultValue: "",
      },
      {
        type: "number",
        label: "Total Weight",
        name: "totalweight",
        defaultValue: "",
      },
      {
        type: "number",
        label: "Units Per Case",
        name: "units_per_case",
        defaultValue: "",
      },
    ],
    []
  );

  return { getFormsFields };
}
