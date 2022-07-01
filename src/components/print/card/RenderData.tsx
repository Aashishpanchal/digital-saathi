import React from "react";
import usePrintData from "../../../hooks/usePrintData";

export default function RenderData(props: {
  labels?: Array<{ [key: string]: any }>;
  data?: { [key: string]: any };
}) {
  const { printData } = usePrintData({
    labels: props.labels,
    data: props.data,
  });
  return (
    <div className="border-t-2 mt-1 print:border-gray-100 border-gray-200 p-4 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:w-2/3 print:grid-cols-2">
        {printData.map((item, index) => {
          return (
            <div key={index} className="grid grid-cols-2 gap-1">
              <span className="font-bold">{item.get("Label")}</span>
              <span className="text-justify">{item.get("Cell")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
