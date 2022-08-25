import React from "react";

export default function Container(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      {props.children}
    </div>
  );
}
