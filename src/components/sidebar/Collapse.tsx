import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import SideBarItem from "./SideBarItem";

export default function Collapse(props: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  urlMatchToOpen?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (props.urlMatchToOpen) {
      if (location.pathname.includes(props.urlMatchToOpen)) {
        setOpen(true);
      }
    }
  }, [location.pathname]);

  return (
    <>
      <SideBarItem
        onClick={() => {
          setOpen(!open);
        }}
        icon={props.icon}
        rightIcon={<FaChevronRight />}
      >
        {props.label}
      </SideBarItem>
      {open && <div className="ml-10 space-y-2">{props.children}</div>}
    </>
  );
}
