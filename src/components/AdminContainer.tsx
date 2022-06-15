import React from "react";
import Header from "./header/Header";
import SideBar from "./sidebar";
import useDimensions from "../hooks/useDimensions";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function AdminContainer(props: { children: React.ReactNode }) {
  const dimensions = useDimensions();
  const sideBar = useSelector((state: RootState) => state.sideBarSlice.open);

  return (
    <div className="flex h-full dark:bg-gray-600">
      {/* Side Bar */}
      <SideBar />
      <div
        className={`${
          dimensions.width >= 640
            ? sideBar
              ? "hidden"
              : "flex"
            : sideBar
            ? "hidden"
            : "flex"
        } sm:flex md:flex lg:flex bg-gray-100 dark:bg-gray-600 flex-col flex-auto min-h-screen overflow-x-hidden`}
      >
        {/* Header Bar */}
        <Header />
        {/* Main Content */}
        {props.children}
      </div>
    </div>
  );
}
