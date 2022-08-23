import React from "react";
import { IoMdTimer } from "react-icons/io";

export default function ComingSoonPage() {
  return (
    <div className="flex items-center justify-center w-full">
      <div>
        <IoMdTimer size={120} className="text-blue-light" />
        <span className="font-bold text-lg">Coming Soon.....</span>
      </div>
    </div>
  );
}
