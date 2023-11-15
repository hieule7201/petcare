import { NavLink } from "react-router-dom";
import InputForm from "../../UI/InputForm";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../UI/PrimaryButton";
import "./register.css";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useState } from "react";
import axios from "axios";

const Schema = Joi.object({
  name: Joi.string().required().min(5).max(50).label("Name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().required().min(8).max(50).label("Password"),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(Schema),
  });

  const onSubmit = async (data) => {
    const newData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    console.log(newData);
    await axios
      .post("http://localhost:8081/register", newData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container register-container">
      <InputForm method="POST" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="register-title">Create Account</h5>
        <div className="register-field">
          <input
            type="text"
            name="name"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="register_validate">{errors.name.message}</p>
          )}
          <input
            type="text"
            name="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="register_validate">{errors.email.message}</p>
          )}

          <div className="input-password">
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Password"
              name="password"
              {...register("password")}
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
          {errors.password && (
            <p className="register_validate">{errors.password.message}</p>
          )}

          <div className="input-password">
            <input
              type={`${showPassword2 ? "text" : "password"}`}
              placeholder="Confirm Password"
              name="confirm_password"
              {...register("confirm_password")}
            />
            {errors.confirm_password && (
              <p className="register_validate">
                {errors.confirm_password.message}
              </p>
            )}

            {showPassword2 ? (
              <AiOutlineEyeInvisible
                className="eye-icon"
                onClick={() => {
                  setShowPassword2((showPassword) => !showPassword);
                }}
              />
            ) : (
              <AiOutlineEye
                className="eye-icon"
                onClick={() => {
                  setShowPassword2((showPassword) => !showPassword);
                }}
              />
            )}
          </div>
        </div>
        <div className="register-accept">
          <input type="checkbox" name="accept" />
          <label htmlFor="accept">Accept All terms & Conditions</label>
        </div>

        <PrimaryButton title="Register" type="submit" />
        <div className="register-change_login">
          <p>Already have account?</p>
          <NavLink to="/login">Login</NavLink>
        </div>
      </InputForm>
    </div>
  );
};

export default Register;
