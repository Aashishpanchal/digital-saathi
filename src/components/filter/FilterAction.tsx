import React from "react";

import { FaSearch } from "react-icons/fa";
import { BiReset } from "react-icons/bi";

export default function FilterAction(props: {
  onSearch?: () => void;
  onReset?: () => void;
}) {
  return (
    <div className="px-4 py-2 flex flex-row space-x-3 justify-end">
      <button
        onClick={props.onSearch}
        type="submit"
        className="text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
      >
        <span className="flex items-center justify-center space-x-2.5">
          <FaSearch size={15} />
          <h1>Search</h1>
        </span>
      </button>
      <button
        onClick={props.onReset}
        className="text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:bg-gray-800 dark:hover:bg-gray-600 text-gray-700 border dark:text-white border-gray-300  dark:border-gray-800 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
      >
        <span className="flex items-center justify-center space-x-2.5">
          <BiReset size={15} />
          <h1>Reset</h1>
        </span>
      </button>
    </div>
  );
}
