import React from "react";

export default function SideBarItem(props: {
  children: string | React.ReactNode;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={props.onClick}
      className={"flex space-x-2 items-center px-4 py-2 rounded-md ".concat(
        props.active
          ? "bg-gray-700 text-gray-200"
          : "transition-colors duration-200 transform text-gray-400 hover:bg-gray-700 hover:text-gray-200"
      )}
    >
      <div>{props.icon}</div>
      <div className="mx-3 font-medium">
        {typeof props.children === "string" ? (
          <button>{props.children}</button>
        ) : (
          props.children
        )}
      </div>
      <div>{props.rightIcon}</div>
    </div>
  );
}
