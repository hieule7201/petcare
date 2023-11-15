import { NavLink } from "react-router-dom";
import "./login.css";
import InputForm from "../../UI/InputForm";
import PrimaryButton from "../../UI/PrimaryButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";

const Schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .label("Email"),
  password: Joi.string().required().label("Password"),
});
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(Schema) });

  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:8081/login", data)
      .then((res) => {
        console.log(res.data);
        alert("login successfully");
        window.location = "/";
      })
      .catch((err) => alert("Password or Email is Wrong"));
  };

  return (
    <div className="container login-container">
      <InputForm method="POST" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="login-title">Login</h5>
        <div className="login-field">
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
            {errors.password && (
              <p className="register_validate">{errors.password.message}</p>
            )}
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
        </div>
        <div className="login-links">
          <div className="login-remember">
            <input type="checkbox" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <p className="login-forget">Forget Password</p>
        </div>
        <PrimaryButton type="submit" title="Login" />
        <div className="login-change_register">
          <p>Don't have account?</p>
          <NavLink to="/register">Register</NavLink>
        </div>
      </InputForm>
    </div>
  );
};

export default Login;
