import React from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export default function CollapseDropDown(props: {
  title: string;
  children: React.ReactNode;
  color?: "white" | "green";
}) {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div
      className={
        "border-gray-200 dark:border-gray-600 border rounded-md mb-2 overflow-x-auto shadow-md "
      }
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "" : "border-gray-200 dark:border-gray-600 border-b mb-2"
        } flex items-center justify-between cursor-pointer p-3 ${
          props.color === "green" ? "text-white bg-blue-light" : ""
        }`}
      >
        <div className="flex items-center font-medium">{props.title}</div>
        {isOpen ? <FaChevronRight /> : <FaChevronDown />}
      </div>
      <div className={"pb-3 px-3 " + (isOpen ? "hidden" : "block")}>
        {props.children}
      </div>
    </div>
  );
}
