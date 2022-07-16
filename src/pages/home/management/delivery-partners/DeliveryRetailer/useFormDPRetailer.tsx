import React from "react";
import useGetData from "../../../../../hooks/useGetData";
import { retailer } from "../../../../../http";

export default function useFormDPRetailer() {
  const [retailerOptions, setRetailerOptions] = React.useState<{
    [key: string]: any;
  }>({});
  const { data: retailerData } = useGetData({
    axiosFunction: retailer,
    extractKey: "retailers",
  });

  const onRetrieveRetailer = async () => {
    try {
      let options: any = { ...retailerOptions };
      retailerData.map((item: any) => {
        options[item?.retailer_id?.toString()] = item?.retailer_name;
      });
      setRetailerOptions({
        ...options,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFormsFields = React.useMemo(
    () => [
      {
        type: "select",
        label: "Retailer",
        name: "retailer_id",
        options: retailerOptions,
        defaultOption: {
          "": "Select Retailer",
        },
        defaultValue: "",
        validate: true,
        hintText: "Please Select any Retailer ID",
      },
    ],
    [retailerOptions]
  );

  React.useEffect(() => {
    onRetrieveRetailer();
  }, [retailerData]);

  return { getFormsFields };
}
