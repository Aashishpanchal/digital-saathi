import { Select } from "flowbite-react";
import React from "react";
export function SelectColumActiveDeactivateFilter({ column: { filterValue, setFilter, id }, }) {
    // Render a multi-select box
    return (<div className="mb-3">
      <Select name={id} id={id} value={filterValue} onChange={(e) => {
            setFilter(e.target.value || undefined);
        }}>
        <option value="">All</option>
        <option value={1} className="w-fit py-1 px-1.5 rounded-full flex space-x-1 items-center bg-opacity-10 text-green-500 bg-green-500">
          {"Active"}
        </option>
        <option value={0} className="w-fit py-1 px-1.5 rounded-full flex space-x-1 items-center bg-opacity-10 text-yellow-500 bg-yellow-500">
          {"Deactivate"}
        </option>
      </Select>
    </div>);
}
export function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id }, }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);
    // Render a multi-select box
    return (<div className="mb-3">
      <Select name={id} id={id} value={filterValue} onChange={(e) => {
            setFilter(e.target.value || undefined);
        }}>
        <option value="">All</option>
        {options.map((option, i) => (<option key={i} value={option}>
            {option}
          </option>))}
      </Select>
    </div>);
}
