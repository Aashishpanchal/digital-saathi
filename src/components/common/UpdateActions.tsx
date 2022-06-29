import React from "react";
import { MdSaveAlt } from "react-icons/md";
import { Spinner } from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

export default function UpdateActions(props: {
  onSave?: () => void;
  onCancel?: () => void;
  startLoading?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div className="mt-5 flex flex-row space-x-3">
      <Button
        onClick={props.onSave}
        type="submit"
        icon={
          props.startLoading ? <Spinner size="md" /> : <MdSaveAlt size={20} />
        }
        color="dark"
      >
        Update
      </Button>
      <Button
        onClick={() => {
          navigate(-1);
        }}
        type="button"
        color="white"
        icon={<IoMdClose size={22} />}
      >
        Cancel
      </Button>
    </div>
  );
}
