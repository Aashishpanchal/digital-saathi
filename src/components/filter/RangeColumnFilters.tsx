import React from "react";
import { TextInput } from "flowbite-react";
import moment from "moment";

const DateFormateString = "YYYY-MM-DD";

export function DateColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}: any) {
  const dates = preFilteredRows.map((val: any) => moment(val.original[id]));
  const minDate = moment.min(dates).subtract(1, "day"); // To include the date
  const maxDate = moment.max(dates).add(1, "day");

  return (
    <div className="flex items-center flex-wrap gap-2">
      <TextInput
        type="date"
        min={minDate.format(DateFormateString)}
        max={maxDate.format(DateFormateString)}
        value={filterValue[0] || ""}
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [val || undefined, old[1]]);
        }}
        color="green"
      />
      <span className="font-bold mx-2">To</span>
      <TextInput
        type="date"
        value={filterValue[1] || ""}
        max={maxDate.format(DateFormateString)}
        min={minDate.format(DateFormateString)}
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [old[0], val || undefined]);
        }}
        color="green"
      />
    </div>
  );
}

export function DateTimeFilterMethod(
  rows: any[],
  columnIds: any,
  filterValue: any
) {
  if (typeof filterValue[0] === "undefined") {
    return rows;
  }
  if (typeof filterValue[1] === "undefined") {
    return rows;
  }
  let start = moment(filterValue[0]).subtract(1, "day");
  let end = moment(filterValue[1]).add(1, "day");
  return rows.filter((val) => {
    return moment(val.original[columnIds]).isBetween(start, end);
  });
}
