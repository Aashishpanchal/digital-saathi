import React from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export default function Filters(props: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className="border-gray-200 dark:border-gray-600 border rounded-md mb-2 overflow-x-auto">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "" : "border-gray-200 dark:border-gray-600 border-b mb-4"
        } flex items-center justify-between cursor-pointer p-4`}
      >
        <div className="flex items-center font-medium">Filters</div>
        {isOpen ? (
          <FaChevronDown className="text-gray-600 dark:text-gray-300" />
        ) : (
          <FaChevronRight className="text-gray-600 dark:text-gray-300" />
        )}
      </div>
      <div className={isOpen ? "hidden" : "block"}>{props.children}</div>
    </div>
  );
}
