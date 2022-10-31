import React from "react";
import { NumericFormat } from "react-number-format";
import { Cell } from "react-table";
import { nullFree, totalGst } from "../../../utils";
import { TextCenter } from "../../styles";

export default function NetAmount(props: { cell: Cell }) {
  const {
    cell: {
      row: { original },
    },
  }: Record<string, any> = props;

  const netAmount = React.useMemo(
    () =>
      nullFree(original?.total_price) -
      totalGst(nullFree(original?.total_price), nullFree(original?.igst)),
    []
  );
  return (
    <TextCenter>
      <NumericFormat
        value={netAmount}
        displayType={"text"}
        decimalScale={2}
        thousandSeparator={true}
        prefix={"₹ "}
      />
    </TextCenter>
  );
}
