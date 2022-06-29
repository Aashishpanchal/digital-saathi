import React from "react";
import { TextInput } from "flowbite-react";
export default function DateColumnFilter({ column: { filterValue = [], preFilteredRows, setFilter, id }, }) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length
            ? new Date(preFilteredRows[0].values[id])
            : new Date(0);
        let max = preFilteredRows.length
            ? new Date(preFilteredRows[0].values[id])
            : new Date(0);
        preFilteredRows.forEach((row) => {
            const rowDate = new Date(row.values[id]);
            min = rowDate <= min ? rowDate : min;
            max = rowDate >= max ? rowDate : max;
        });
        return [min, max];
    }, [id, preFilteredRows]);
    return (<div className="flex items-center space-x-2">
      <TextInput type="date" min={min.toISOString().slice(0, 10)} onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [val ? val : undefined, old[1]]);
        }} value={filterValue[0] || ""}/>
      {" to "}
      <TextInput type="date" max={max.toISOString().slice(0, 10)} onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [
                old[0],
                val ? val.concat("T23:59:59.999Z") : undefined,
            ]);
        }} value={filterValue[1]?.slice(0, 10) || ""}/>
    </div>);
}
