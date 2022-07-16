import React from "react";
import { Link } from "react-router-dom";

export default function RedirectAuth0UserInformation(cell: {
  [key: string]: any;
}) {
  return <Link to={"/auth0-users/".concat(cell.value)}>{cell.value}</Link>;
}
