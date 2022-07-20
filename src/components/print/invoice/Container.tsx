import React from "react";

export default function Container(props: {
  children: React.ReactNode;
  ref?: React.LegacyRef<HTMLDivElement>;
}) {
  return (
    <div className="lg:mx-32 xl:mx-44 overflow-auto" ref={props.ref}>
      {props.children}
    </div>
  );
}
