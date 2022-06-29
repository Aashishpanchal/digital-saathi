import React from "react";
export default function BackgroundImage(props) {
    return (<div className="bg-cover h-screen flex items-center justify-center" style={{ backgroundImage: `url('${props.source}')` }}>
      {props.children}
    </div>);
}
