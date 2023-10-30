import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputPassword = ({ placeholder, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="input-password">
      <input
        type={`${showPassword ? "text" : "password"}`}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      {showPassword ? (
        <AiOutlineEyeInvisible
          className="eye-icon"
          onClick={() => {
            setShowPassword((showPassword) => !showPassword);
          }}
        />
      ) : (
        <AiOutlineEye
          className="eye-icon"
          onClick={() => {
            setShowPassword((showPassword) => !showPassword);
          }}
        />
      )}
    </div>
  );
};

export default InputPassword;
