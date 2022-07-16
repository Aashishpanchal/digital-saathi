import React from "react";

export default function TableContainer(props: { children: React.ReactNode }) {
  return <table className="w-full">{props.children}</table>;
}
