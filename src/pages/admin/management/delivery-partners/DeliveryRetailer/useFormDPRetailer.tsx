import React from "react";
import AsyncSelectInput from "../../../../../components/form/inputs/AsyncSelectInput";
import { retailer } from "../../../../../http";

export default function useFormDPRetailer() {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "select",
        label: "Retailer",
        name: "retailer_id",
        defaultOption: {
          "": "Select Retailer",
        },
        defaultValue: "",
        Field: (props: any) => (
          <AsyncSelectInput
            {...props}
            axiosFunction={retailer}
            extractKey="retailers"
            filterValue={(value) => ({
              key: value.retailer_id,
              value: value.retailer_name,
            })}
          />
        ),
        validate: true,
        hintText: "Please Select any Retailer ID",
      },
    ],
    []
  );

  return { getFormsFields };
}
