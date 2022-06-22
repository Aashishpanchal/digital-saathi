import { Select } from "flowbite-react";
import React from "react";

export function SelectColumActiveDeactivateFilter({
  column: { filterValue, setFilter, id },
}: {
  column: any;
}) {
  // Render a multi-select box
  return (
    <div className="mb-3">
      <Select
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        <option value={0}>{"Deactivate"}</option>
        <option value={1}>{"Active"}</option>
      </Select>
    </div>
  );
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: {
  column: any;
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...(options as any).values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <div className="mb-3">
      <Select
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}
