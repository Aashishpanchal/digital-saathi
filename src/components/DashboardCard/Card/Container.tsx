import React from "react";

export default function Container(props: {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  React.useEffect(() => {
    console.log("Same");
  }, []);
  return (
    <div
      onClick={props.onClick}
      className={"bg-white dark:bg-gray-800 p-2 border dark:border-gray-600 rounded-2xl shadow-sm hover:shadow-lg ".concat(
        props.disabled ? "cursor-default" : "hover:cursor-pointer"
      )}
    >
      {props.children}
    </div>
  );
}
