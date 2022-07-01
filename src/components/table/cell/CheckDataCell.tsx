import React from "react";

export default function CheckDataCell(props: { cell: any }) {
  //   const { original } = props.cell.row;
  const { value } = props.cell;
  if (!value) {
    return <div className="text-red-600 font-bold">Error No Data</div>;
  }
  return <div>{value}</div>;
}
