import React from "react";
import usePrintData from "../../../hooks/usePrintData";

export default function RenderTableCell(props: {
  labels?: Array<{ [key: string]: any }>;
  data?: { [key: string]: any };
}) {
  const { printData } = usePrintData({
    labels: props.labels,
    data: props.data,
  });
  return (
    <td>
      <ul>
        {printData.map((item, index) => (
          <li key={index.toString()}>
            <span>
              <strong>{item.get("Label")}: </strong>
              {item.get("Cell")}
            </span>
          </li>
        ))}
      </ul>
    </td>
  );
}
