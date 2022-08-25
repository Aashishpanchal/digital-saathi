import React from "react";
import { baseImageUrl } from "../../http/config";

export default function Image(props: {
  src?: string;
  alt: string;
  size?: number | string;
  url?: string;
}) {
  return (
    <div
      className="w-16 h-fit"
      style={{
        width: props.size ? props.size : undefined,
      }}
    >
      <img
        className="w-full h-full"
        src={props.url || baseImageUrl?.concat(props.src || "")}
        onError={(e) => {
          (e.target as any).src = "/assets/images/default-image.png";
        }}
      />
    </div>
  );
}
