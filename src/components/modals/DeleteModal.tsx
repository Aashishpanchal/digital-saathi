import { Modal, Button } from "flowbite-react";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DeleteModal(props: {
  show: boolean;
  onClose?: () => void;
  onClickNo?: () => void;
  onClickYes?: () => void;
}) {
  const { show, onClose, onClickNo, onClickYes } = props;
  return (
    <React.Fragment>
      <Modal show={show} size="md" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this entry?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={onClickYes}>
                Yes, I'm sure
              </Button>
              <Button onClick={onClickNo} color="light">
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
