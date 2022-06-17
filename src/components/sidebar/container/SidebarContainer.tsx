import React from "react";
import { useSelector } from "react-redux";
import useDimensions from "../../../hooks/useDimensions";
import { RootState } from "../../../redux/store";

export default function SidebarContainer(props: { children: React.ReactNode }) {
  const dimensions = useDimensions();
  const sideBar = useSelector((state: RootState) => state.sideBarSlice.open);

  return (
    <div
      id="sidebar1"
      className={`${
        dimensions.width < 640
          ? sideBar
            ? "flex flex-col w-full"
            : "hidden"
          : sideBar
          ? "flex flex-col w-full"
          : "hidden"
      } sm:w-64 md:w-64 lg:w-64 flex-shrink-0 min-h-screen px-4 py-4 border-0 sm:border-r md:border-r lg:border-r border-gray-400 bg-white dark:border-gray-600`}
    >
      {props.children}
    </div>
  );
}
