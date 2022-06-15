import React from "react";

export default function FilterForm(props: {
  children: React.ReactNode;
  method?: string;
}) {
  return (
    <form
      method={props.method}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="pl-4 pr-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {props.children}
      </div>
    </form>
  );
}
