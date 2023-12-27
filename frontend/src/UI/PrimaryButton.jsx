import React from "react";

const PrimaryButton = ({ children, type }) => {
  return (
    <button className="primary-btn" type={type}>
      {children}
    </button>
  );
};

export default PrimaryButton;
