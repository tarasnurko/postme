import React from "react";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type || "button"}
      disabled={props.disabled || false}
      className={`line-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg  transition duration-150 ease-in-out ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;

// Червоний - підписатися
// Сірий  - відписатися
// Червоний - видалити
// Зелений - створити
// Синій - додати
// Сірий - відмінити
