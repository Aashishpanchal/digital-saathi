import React from "react";

export default function FlexCenter(props: {
  Icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 my-12">
      <div className="text-gray-400">{props.Icon}</div>
      <span className="text-[15px] text-gray-900 font-bold">{props.title}</span>
    </div>
  );
}
