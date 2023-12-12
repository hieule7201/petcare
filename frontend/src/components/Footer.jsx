import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import Logo from "../assets/img/pawprint.png";
import { links } from "../data";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container footer-container">
        <Link to="/" className="footer-logo">
          <img src={Logo} alt="" />
          <h3 className="logo">Petty</h3>
        </Link>
        <div className="footer-links">
          <p className="footer-title">Link</p>
          {links.map(({ name, path }, index) => {
            return (
              <div key={index}>
                <Link to={path}>{name}</Link>
              </div>
            );
          })}
        </div>
        <div className="footer-links">
          <p className="footer-title">Employee</p>
          <Link to="/login">Login</Link>
        </div>
        <div className="footer-links">
          <p className="footer-title">Contact us</p>
          <div className="box-contact">
            <p className="contact-title">Phone:</p>
            <p>+84 258 542 336</p>
          </div>
          <div className="box-contact">
            <p className="contact-title">Address:</p>
            <p>02 Thanh Son, Thanh Binh, Hai Chau, Da Nang</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
