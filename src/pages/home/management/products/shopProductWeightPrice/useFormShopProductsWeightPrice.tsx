import React from "react";
import LabelTextInput from "../../../../../components/form/LabelTextInput";
import useGetData from "../../../../../hooks/useGetData";
import { shopPackages, shopUnits } from "../../../../../http";

export default function useFormShopProductsWeightPrice() {
  const [packageOptions, setPackageOptions] = React.useState<any>({});
  const [unitOptions, setUnitOptions] = React.useState<any>({});

  const removePostFix = (value: string): any => {
    const reg = /([\d]+(?:\.[\d]+)?(?![\d]))|([a-z.]+)(?![a-z.])/gi;
    return value.match(reg) || ["", ""];
  };

  const { data: packagesData } = useGetData({
    axiosFunction: shopPackages,
    extractKey: "packages",
  });
  const { data: unitsData } = useGetData({
    axiosFunction: shopUnits,
    extractKey: "units",
  });

  const getUnitOptionsId = (weight: string) => {
    const value = removePostFix(weight)[1] || "";
    for (let key in unitOptions) {
      if (unitOptions[key] === value) {
        return key;
      }
    }
    return value;
  };

  // this method depend on packagesData
  const onRetrievePackages = async () => {
    try {
      let options: any = { ...packageOptions };
      packagesData.map((item: any) => {
        options[item?.package_id?.toString()] = item?.package;
      });
      setPackageOptions({
        ...options,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // this method depend on unitsData
  const onRetrieveUnits = async () => {
    try {
      let options: any = { ...unitOptions };
      unitsData.map((item: any) => {
        options[item?.units_id?.toString()] = item?.units;
      });
      setUnitOptions({
        ...options,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "MRP",
        name: "mrp",
        defaultValue: "",
        validate: true,
        hintText: "MRP is compulsory",
      },
      {
        type: "string",
        label: "IGST",
        name: "igst",
        defaultValue: "",
        validate: true,
        hintText: "IGST is compulsory",
      },
      {
        type: "string",
        label: "CGST Code",
        name: "cgst",
        defaultValue: "",
        validate: true,
        hintText: "CGST is compulsory",
      },
      {
        type: "string",
        label: "SGST",
        name: "sgst",
        defaultValue: "",
        validate: true,
        hintText: "sgst is compulsory",
      },
      {
        type: "string",
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
        options: unitOptions,
        defaultOption: { "": "Select Units" },
        onAllReset: () => {
          return {
            units: "",
          };
        },
        Field: (props: any) => {
          return (
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
                />
              </div>
              <div className="mt-5 w-full md:w-1/2">
                <LabelTextInput
                  type={"select"}
                  name="units"
                  defaultOption={props.defaultOption}
                  options={props.options}
                  value={props.data.units}
                  onChange={(e) => {
                    props.setData({ ...props.data, units: e.target.value });
                  }}
                />
              </div>
            </div>
          );
        },
      },
      {
        type: "select",
        label: "Package",
        name: "package",
        options: packageOptions,
        defaultOption: {
          "": "Select Package",
        },
        defaultValue: "",
        validate: true,
        hintText: "Package is compulsory",
      },
      {
        type: "string",
        label: "Dimension",
        name: "dimension",
        defaultValue: "",
      },
      {
        type: "string",
        label: "Total Weight",
        name: "total_weight",
        defaultValue: "",
      },
      {
        type: "string",
        label: "Units Per Case",
        name: "units_per_case",
        defaultValue: "",
      },
    ],
    [packageOptions, unitOptions]
  );

  React.useEffect(() => {
    onRetrievePackages();
    onRetrieveUnits();
  }, [packagesData, unitsData]);

  return { getFormsFields, getUnitOptionsId, unitOptions, removePostFix };
}
