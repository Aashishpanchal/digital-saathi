import { Spinner } from "flowbite-react";
import React from "react";

export default function ActivateDeactivateCell(props: {
  cell: any;
  onClick?: (
    value: { [key: string]: any },
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
}) {
  const active = props.cell.value === 0 ? false : true;
  const [loading, setActiveDeactivateLoading] = React.useState(false);
  return (
    <button
      disabled={props.onClick ? false : true}
      // onClick={props.onClick}
      onClick={() =>
        props.onClick &&
        props.onClick(props.cell.row.values, setActiveDeactivateLoading)
      }
      className={"w-fit py-1 px-1.5 rounded-full flex space-x-1 items-center bg-opacity-10 ".concat(
        active ? "text-green-500 bg-green-500" : "text-yellow-500 bg-yellow-500"
      )}
    >
      {loading && <Spinner size="sm" color="red" />}
      <span>{active ? "Activate" : "Deactivate"}</span>
    </button>
  );
}
