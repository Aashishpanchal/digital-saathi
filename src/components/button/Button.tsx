import React from "react";

export default function Button(props: {
  children: string | React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  type?: "submit" | "button";
  color?: "white" | "dark";
}) {
  const className =
    props.color === "dark"
      ? "text-white active:bg-green-400 bg-blue-light hover:shadow-blue-light hover:shadow-md "
      : "text-gray-700 active:bg-gray-100 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-600 border dark:text-white border-gray-300 dark:border-gray-800 bg-white";
  return (
    <button
      className={"flex justify-center items-center space-x-2 mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide transition-colors duration-300 transform rounded-md focus:outline-none ".concat(
        className
      )}
      type={props.type}
      onClick={props.onClick}
    >
      {props.icon}
      {typeof props.children === "string" ? (
        <span>{props.children}</span>
      ) : (
        props.children
      )}
    </button>
  );
}
