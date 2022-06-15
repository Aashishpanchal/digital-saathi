import React from "react";
import { baseImageUrl } from "../../http/config";

export default function Image(props: { src: string; alt: string }) {
  return (
    <div className="w-16 h-fit">
      <img
        className="w-full h-full"
        src={baseImageUrl?.concat(props.src)}
        alt={props.alt.concat(" image")}
      />
    </div>
  );
}
