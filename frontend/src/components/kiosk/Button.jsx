import React from "react";

function Button({ onClick, text }) {
  return (
    <button className="Button" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
