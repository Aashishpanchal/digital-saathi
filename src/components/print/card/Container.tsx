import React from "react";

export default function Container(props: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 print:bg-white w-full p-2 screen:rounded-lg screen:shadow-sm page-break">
      {props.children}
    </div>
  );
}
