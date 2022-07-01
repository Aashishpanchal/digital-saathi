import { Modal } from "flowbite-react";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function UploadDataModal(props: {
  show: boolean;
  onClose: (value: boolean) => void;
  errors: any[];
}) {
  const { show, onClose, errors } = props;

  return (
    <React.Fragment>
      <Modal show={show} size="md" popup={true} onClose={() => onClose(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Validation Error in your data sets
            </h3>
            <div className="max-h-24 overflow-auto">
              {errors.length !== 0
                ? errors.map((item, index) => (
                    <div key={index} className="flex space-x-2 justify-center">
                      <span className="font-bold text-black w-32">
                        Row {item.row}:
                      </span>
                      <span className="text-red-500 font-bold w-64s">
                        {item.errorText}
                      </span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
