import React from "react";

export default function CardNumTitleRender(props: {
  num: number;
  title: string;
  Icon: React.ReactNode;
}) {
  return (
    <div className="h-[150px] dark:text-white flex justify-between items-center px-2 py-1">
      <div className="flex w-fit flex-col items-center space-y-4">
        <span className="text-4xl font-bold text-blue-light">{props.num}</span>
        <span className="text-[15px] text-gray-900 font-bold">
          {props.title[0].toUpperCase().concat(props.title.slice(1))}
        </span>
      </div>
      <div className="self-end mt-2 text-blue-light dark:text-white">
        {props.Icon}
      </div>
    </div>
  );
}
