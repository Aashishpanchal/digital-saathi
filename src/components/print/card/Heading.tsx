import React from "react";

export default function Heading(props: {
  icon?: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="flex items-center space-x-2 text-blue-light font-mono">
      {props.icon}
      <h2 className="text-2xl font-bold">{props.title}</h2>
    </div>
  );
}
