import React from "react";

const FormBooking = ({ data, setData }) => {
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <form className="box-form">
      <input
        type="text"
        className="text-custom"
        name="nameUser"
        placeholder="Enter your name"
        onChange={handleInput}
      />
      <input
        type="text"
        className="text-custom"
        name="phone"
        placeholder="Enter your phone"
        onChange={handleInput}
      />
      <input
        type="text"
        className="text-custom"
        name="email"
        placeholder="Enter your mail"
        onChange={handleInput}
      />
      <input
        type="text"
        className="text-custom"
        name="address"
        placeholder="Enter your address"
        onChange={handleInput}
      />
    </form>
  );
};

export default FormBooking;
