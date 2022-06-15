import React from "react";

export default function Form(props: { children: React.ReactNode }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {props.children}
    </form>
  );
}
