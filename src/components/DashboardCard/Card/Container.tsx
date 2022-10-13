import React from "react";

function Container(props: {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
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

export default React.memo(Container);
