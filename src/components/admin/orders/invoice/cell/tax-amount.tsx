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
    const tGst = totalGst(
      nullFree(original?.total_price),
      nullFree(original?.igst)
    );
    return bothGst ? [tGst / 2, tGst / 2] : [tGst];
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
