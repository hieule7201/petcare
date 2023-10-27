import { NavLink } from "react-router-dom";
import "./login.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const Login = () => {
  const [eye, setEye] = useState(true);
  return (
    <div className="container login-container">
      <form action="" method="POST" className="login-form">
        <h5 className="login-title">Login</h5>
        <div className="login-field">
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          {eye ? (
            <AiOutlineEye
              className="login-eye"
              onClick={() => {
                setEye((eye) => !eye);
              }}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="login-eye"
              onClick={() => {
                setEye((eye) => !eye);
              }}
            />
          )}
        </div>
        <div className="login-links">
          <div className="login-remember">
            <input type="checkbox" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <p className="login-forget">Forget Password</p>
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <div className="login-change_register">
          <p>Don't have account?</p>
          <NavLink to="/register">Register</NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
