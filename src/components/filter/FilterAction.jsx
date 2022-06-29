import React from "react";
import { FaSearch } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
import Button from "../button/Button";
export default function FilterAction(props) {
    return (<div className="px-4 py-2 flex flex-row space-x-3 justify-end">
      <Button onClick={props.onSearch} type="submit" icon={<FaSearch size={15}/>} color="dark">
        Search
      </Button>
      <Button onClick={props.onReset} type="button" icon={<BiReset size={15}/>}>
        Reset
      </Button>
    </div>);
}
