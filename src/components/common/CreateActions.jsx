import React from "react";
import { BiReset, BiSave } from "react-icons/bi";
import { Spinner } from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import Button from "../button/Button";
export default function CreateActions(props) {
    return (<div className="mt-5 flex flex-row space-x-3">
      <Button onClick={props.onSave} type="submit" icon={props.startLoading ? <Spinner size="md"/> : <BiSave size={20}/>} color="dark">
        Save
      </Button>
      <Button onClick={props.onReset} type="button" color="white" icon={<BiReset size={20}/>}>
        Reset
      </Button>
      <Button onClick={props.onCancel} type="button" color="white" icon={<IoMdClose size={22}/>}>
        Cancel
      </Button>
    </div>);
}
