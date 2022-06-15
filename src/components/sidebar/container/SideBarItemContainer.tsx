import React from "react";

export default function SideBarItemContainer(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between flex-1 mt-6 hover:cursor-pointer">
      <nav className="space-y-2">{props.children}</nav>
    </div>
  );
}
