import React from "react";
import { FaTractor, FaWarehouse } from "react-icons/fa";
import { BsShopWindow } from "react-icons/bs";
export default function Card(props) {
    const { type } = props;
    const Icon = type === "farmers"
        ? FaTractor
        : type === "warehouses"
            ? FaWarehouse
            : BsShopWindow;
    return (<div onClick={props.onClick} className="bg-white dark:bg-gray-800 p-2 border dark:border-gray-600 rounded-2xl shadow-sm hover:shadow-lg hover:cursor-pointer">
      <div className="h-[150px] dark:text-white flex justify-between items-center px-2 py-1">
        <div className="flex w-fit flex-col items-center space-y-4">
          <span className="text-4xl font-bold text-blue-light">
            {props.total}
          </span>
          <span className="text-[15px] text-gray-400">
            {props.type[0].toUpperCase().concat(props.type.slice(1))}
          </span>
        </div>
        <div className="self-start mt-2">
          <Icon size={50} className="text-blue-light dark:text-white "/>
        </div>
      </div>
    </div>);
}
