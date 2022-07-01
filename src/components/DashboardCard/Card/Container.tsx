import React from "react";

export default function Container(props: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={props.onClick}
      className="bg-white dark:bg-gray-800 p-2 border dark:border-gray-600 rounded-2xl shadow-sm hover:shadow-lg hover:cursor-pointer"
    >
      {props.children}
    </div>
  );
}
