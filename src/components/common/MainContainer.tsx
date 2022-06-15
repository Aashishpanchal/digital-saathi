import React from "react";

export default function TableContainer(props: {
  children: React.ReactNode;
  heading: string;
}) {
  return (
    <div className="p-3">
      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 border rounded-md">
        {/* Head of Table */}
        <h1 className="text-lg font-medium mb-6">{props.heading}</h1>
        {props.children}
      </div>
    </div>
  );
}
