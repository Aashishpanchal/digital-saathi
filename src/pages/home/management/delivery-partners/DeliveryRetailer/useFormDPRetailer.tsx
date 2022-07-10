import React from "react";
import { retailer } from "../../../../../http";

export default function useFormDPRetailer() {
  const [retailerOptions, setRetailerOptions] = React.useState<{
    [key: string]: any;
  }>({});
  const [localPage, setLocalPage] = React.useState(0);

  const onRetrieveRetailer = async () => {
    try {
      const res = await retailer("get", {
        postfix: `?page=${localPage}`,
      });
      if (res?.status === 200) {
        const { retailers, totalPages, currentPage } = res.data;
        if (totalPages === currentPage) {
          return;
        }
        if (totalPages !== currentPage) {
          if (retailers) {
            let options: any = { ...retailerOptions };
            retailers.map((item: any) => {
              options[item?.retailer_id?.toString()] = item?.retailer_name;
            });
            setRetailerOptions({
              ...options,
            });
            setLocalPage(localPage + 1);
          }
        }
      }
    } catch (error: any) {
      console.log(error.response);
      return;
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
  }, [localPage]);

  return { getFormsFields };
}
