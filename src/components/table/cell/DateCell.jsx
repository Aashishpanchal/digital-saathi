import React from "react";
export default function DateCell(props) {
    const dateFormate = new Date(props.date);
    return <div>{dateFormate.toDateString()}</div>;
}
