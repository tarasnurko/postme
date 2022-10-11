import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 bg-gray-400 bg-opacity-80"
      onClick={props.onClose}
    />
  );
};

const ModalOverlay = (props) => {
  const text = props.type === "create" ? "Do you want to create post?" : "";
  const btnText = props.type === "create" ? "Create post" : "";
  const btnColor =
    props.type === "create" ? "bg-yellow-500 hover:bg-yellow-700" : "";

  return (
    <div className="fixed w-80 h-44 p-6 top-1/2 left-1/2  z-50 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between bg-slate-100 rounded-2xl">
      <p className="text-center text-lg">{text}</p>
      <div className="flex justify-end items-center gap-2">
        <button
          className="py-1 px-4 bg-gray-500 text-white rounded hover:bg-gray-700"
          onClick={props.onClose}
        >
          Close
        </button>
        <button
          className={`py-1 px-4  text-white rounded  ${btnColor}`}
          onClick={props.onConfirm}
        >
          {btnText}
        </button>
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
