import React from "react";

export default function Container(props: { children: React.ReactNode }) {
  return <div className="lg:mx-32 xl:mx-44">{props.children}</div>;
}
