import React from "react";

const FormBooking = ({ data, setData }) => {
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <form>
      <input
        type="text"
        name="nameUser"
        placeholder="Enter your name"
        onChange={handleInput}
      />
      <input
        type="text"
        name="phone"
        placeholder="Enter your phone"
        onChange={handleInput}
      />
      <input
        type="text"
        name="email"
        placeholder="Enter your mail"
        onChange={handleInput}
      />
      <input
        type="text"
        name="address"
        placeholder="Enter your address"
        onChange={handleInput}
      />
    </form>
  );
};

export default FormBooking;
