import { Modal, Spinner } from "flowbite-react";
import React from "react";
import { useDispatch } from "react-redux";
import { setInformationModal } from "../../redux/slices/modalSlice";

export default function InformationModal(props: {
  show?: boolean;
  heading?: string;
  title?: string;
  message?: string;
  runClose?: boolean;
  showLoading?: boolean;
}) {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Modal
        show={props.show}
        popup={props.runClose}
        size="lg"
        onClose={() =>
          props.runClose && dispatch(setInformationModal({ show: false }))
        }
      >
        {props.runClose && <Modal.Header>{props.heading}</Modal.Header>}
        <Modal.Body>
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="w-40">
                <img
                  className="w-fit h-fit"
                  src="/assets/images/logo.png"
                  alt="Logo"
                />
              </div>
            </div>
            {props.showLoading && (
              <div className="flex items-center justify-center space-x-2">
                <Spinner color="green" size="lg" />
                <span className="font-bold text-blue-light">Loading....</span>
              </div>
            )}
            {props.title && (
              <h1 className="font-bold text-lg md:text-xl">{props.title}</h1>
            )}
            {props.message && (
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {props.message}
              </p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
