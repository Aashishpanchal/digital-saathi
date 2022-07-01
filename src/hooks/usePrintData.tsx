import React from "react";

interface RenderClass {
  get: (value: string) => any;
}

export default function usePrintData(props: {
  labels?: Array<{ [key: string]: any }>;
  data?: { [key: string]: any };
}) {
  const [printData, setPrintData] = React.useState<Array<RenderClass>>([]);

  class Render {
    constructor(object: { [key: string]: any }) {
      Object.keys(object).forEach((key) => {
        (this as any)[key] = object[key];
      });
    }
    get(value: string) {
      const v = (this as any)[value];
      if (typeof v === "undefined" || typeof v === null) {
        return "";
      }
      return v;
    }
  }

  const Cell = (cell: any) => {
    return <>{cell.value}</>;
  };

  const instanceCall = () => {
    const valueSet =
      props.labels?.map((item) => {
        let values = { ...item };
        if (props.data) {
          values["value"] = props.data[item.accessor || ""] || "";
        }
        values["Cell"] =
          typeof values["Cell"] === "function"
            ? values["Cell"]({ ...values })
            : Cell({ ...values });

        return new Render(values);
      }) || [];
    setPrintData(valueSet);
  };

  React.useEffect(() => {
    if (props.labels) {
      instanceCall();
    }
  }, [props.data]);

  return { printData };
}
