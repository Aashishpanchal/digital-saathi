import { Spinner } from "flowbite-react";
import React from "react";

export default function ActivateDeactivateBar(props: {
  active?: boolean;
  onClick?: () => void;
  loading?: boolean;
}) {
  return (
    <button
      disabled={props.onClick ? false : true}
      onClick={props.onClick}
      className={"text-white w-fit py-1 px-1.5 rounded-lg flex space-x-1 items-center ".concat(
        props.active ? "bg-green-500" : "bg-amber-500"
      )}
    >
      {props.loading && <Spinner size="sm" color="red" />}
      <span>{props.active ? "Activate" : "Deactivate"}</span>
    </button>
  );
}
