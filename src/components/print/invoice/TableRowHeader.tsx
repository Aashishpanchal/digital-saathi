import React from "react";
import { Tooltip } from "flowbite-react";
import { FaPrint } from "react-icons/fa";
import TableRow from "./TableRow";
import logo from "../../../assets/logo.png";

export default function TableRowHeader(props: {
  onPrintClick?: () => void;
  invoiceNumber?: string;
  invoiceDate?: string;
}) {
  return (
    <TableRow>
      <td>
        <div className="flex justify-center w-36 xl:w-44 h-20">
          <img className="w-fit h-fit print:h-20" src={logo} alt="Logo" />
        </div>
      </td>
      <td className="font-bold place-self-center text-sm">
        Original Tax Invoice
      </td>
      <td className="text-sm print:text-xs">
        <ul className="flex flex-col mx-2">
          <li className="self-end print:hidden relative">
            <Tooltip content="Print" trigger="hover">
              <span className="text-end w-fit">
                <FaPrint
                  onClick={props.onPrintClick}
                  size={25}
                  className="active:text-gray-500 transition-colors hover:cursor-pointer my-2"
                />
              </span>
            </Tooltip>
          </li>
          <li>
            <span className="font-bold">Invoice Number: </span>
            {props.invoiceNumber}
          </li>
          <li>
            <span className="font-bold">Invoice Date: </span>
            {props.invoiceDate}
          </li>
        </ul>
      </td>
    </TableRow>
  );
}
