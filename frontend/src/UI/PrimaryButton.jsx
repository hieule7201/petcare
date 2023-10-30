import React from "react";

const PrimaryButton = ({ title, type }) => {
  return (
    <button className="primary-btn" type={type}>
      {title}
    </button>
  );
};

export default PrimaryButton;
