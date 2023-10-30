import { NavLink } from "react-router-dom";
import InputForm from "../../UI/InputForm";
import InputPassword from "../../UI/InputPassword";
import PrimaryButton from "../../UI/PrimaryButton";
import "./register.css";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");
  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };
  const handleSubmit = (e) => {
    if (values.password.toString().trim === confirm.toString().trim) {
      console.log("ok");
    }
    e.preventDefault();
    axios
      .post("http://localhost:8081/register", values)
      .then((res) => setMessage("successfully"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container register-container">
      <p>{message}</p>
      <InputForm action="/register" method="POST" onSubmit={handleSubmit}>
        <h5 className="register-title">Create Account</h5>
        <div className="register-field">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInput}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInput}
          />

          <InputPassword
            name="password"
            placeholder="password"
            onChange={handleInput}
          />
          <InputPassword
            placeholder="confirm password"
            name="confirm_password"
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
          />
        </div>
        <div className="register-accept">
          <input type="checkbox" name="accept" />
          <label htmlFor="accept">Accept All terms & Conditions</label>
        </div>

        <PrimaryButton title="Login" type="submit" />
        <div className="register-change_login">
          <p>Already have account?</p>
          <NavLink to="/login">Login</NavLink>
        </div>
      </InputForm>
    </div>
  );
};

export default Register;
