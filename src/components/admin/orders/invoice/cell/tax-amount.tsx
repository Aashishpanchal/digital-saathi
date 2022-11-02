import React from "react";
import { NumericFormat } from "react-number-format";
import { Cell } from "react-table";
import { nullFree, totalGst } from "../../../utils";
import { TextCenter } from "../../styles";

export default function TaxAmount(props: { cell: Cell; bothGst: boolean }) {
  const {
    cell: {
      row: { original },
    },
    bothGst,
  }: Record<string, any> = props;

  const gst = React.useMemo(() => {
    const { gst: tGst, igstNum } = totalGst(
      nullFree(original?.total_price),
      nullFree(original?.igst)
    );
    return igstNum !== 0
      ? bothGst
        ? [tGst / 2, tGst / 2]
        : [tGst]
      : bothGst
      ? [0, 0]
      : [0];
  }, []);

  return (
    <TextCenter>
      {gst.map((value, index) => (
        <>
          <NumericFormat
            key={index}
            value={value}
            displayType={"text"}
            decimalScale={2}
            thousandSeparator={true}
            prefix={"₹ "}
          />
          <br />
        </>
      ))}
    </TextCenter>
  );
}
