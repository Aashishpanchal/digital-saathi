import React from "react";

export default function BackgroundImage(props: {
  children: JSX.Element;
  source: string;
}) {
  return (
    <div
      className="bg-cover h-screen flex items-center justify-center"
      style={{ backgroundImage: `url('${props.source}')` }}
    >
      {props.children}
    </div>
  );
}
