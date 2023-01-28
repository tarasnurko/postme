import React from "react";
import ReactDOM from "react-dom";
import CancelButton from "../common/buttons/CancelButton";
import SuccessButton from "../common/buttons/colors/SuccessButton";

const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 bg-gray-400 bg-opacity-80"
      onClick={props.onClose}
    />
  );
};

const ModalOverlay = (props) => {
  const text =
    props.type === "create"
      ? "Do you want to create post?"
      : props.type === "update"
      ? "Do you want to update post?"
      : "";
  const button =
    props.type === "create" ? (
      <SuccessButton onClick={props.onConfirm}>Create Post</SuccessButton>
    ) : props.type === "update" ? (
      <SuccessButton onClick={props.onConfirm}>Update Post</SuccessButton>
    ) : (
      ""
    );

  return (
    <div className="fixed w-80 h-44 p-6 top-1/2 left-1/2  z-50 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between bg-slate-100 rounded-2xl">
      <p className="text-center text-lg">{text}</p>
      <div className="flex justify-end items-center gap-2">
        <CancelButton onClick={props.onClose} />
        {button}
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={props.onClose}
          onConfirm={props.onConfirm}
          type={props.type}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
