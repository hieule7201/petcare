import { NavLink } from "react-router-dom";
import "./login.css";
import InputForm from "../../UI/InputForm";
import PrimaryButton from "../../UI/PrimaryButton";

const Login = () => {
  return (
    <div className="container login-container">
      {/* <InputForm action="" method="POST">
        <h5 className="login-title">Login</h5>
        <div className="login-field">
          <input type="email" name="email" placeholder="Email" />
          <InputPassword placeholder="password" />
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
      </InputForm> */}
    </div>
  );
};

export default Login;
