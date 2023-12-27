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
        required
        name="nameUser"
        placeholder="Nhập tên"
        onChange={handleInput}
      />
      <input
        type="text"
        className="text-custom"
        name="phone"
        placeholder="Nhập số điện thoại"
        required
        onChange={handleInput}
      />
      <input
        type="text"
        className="text-custom"
        name="email"
        placeholder="Nhập email"
        required
        onChange={handleInput}
      />
      <input
        type="text"
        className="text-custom"
        required
        name="address"
        placeholder="Nhập địa chỉ"
        onChange={handleInput}
      />
    </form>
  );
};

export default FormBooking;
