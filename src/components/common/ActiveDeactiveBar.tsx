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
      className={"w-fit py-1 px-1.5 rounded-full flex space-x-1 items-center bg-opacity-10 ".concat(
        props.active
          ? "text-green-500 bg-green-500"
          : "text-yellow-500 bg-yellow-500"
      )}
    >
      {props.loading && <Spinner size="sm" color="red" />}
      <span>{props.active ? "Activate" : "Deactivate"}</span>
    </button>
  );
}
