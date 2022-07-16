import React from "react";

export default function TableRow(props: {
  children: React.ReactNode;
  borderColor?: "black" | "white";
  className?: string;
  grid?: boolean;
}) {
  const borderClass = props.borderColor === "black" ? "border-black" : "";
  const className = props.className
    ? props.className + " " + borderClass
    : borderClass;
  if (props.grid) {
    return (
      <tr
        className={"grid grid-cols-3 gap-4 border-2 border-b-0 px-4 py-5 text-xs ".concat(
          className
        )}
      >
        {props.children}
      </tr>
    );
  } else {
    return (
      <tr
        className={"flex justify-between items-center border-2 border-b-0 pb-2 text-xs ".concat(
          className
        )}
      >
        {props.children}
      </tr>
    );
  }
}
