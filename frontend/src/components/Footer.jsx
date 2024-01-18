import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import Logo from "../assets/img/pawprint.png";
import { links } from "../data";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container footer-container">
        <div className="row w-100">
          <Link to="/" className="footer-logo col-lg-3 col-md-6">
            <img src={Logo} alt="" style={{ maxWidth: "5rem" }} />
            <h3 className="logo">Petty</h3>
          </Link>
          <div className="footer-links col-lg-3 col-md-6">
            <p className="footer-title">Đường dẫn</p>
            {links.map(({ name, path }, index) => {
              return (
                <div key={index}>
                  <Link to={path}>{name}</Link>
                </div>
              );
            })}
          </div>
          <div className="footer-links col-lg-3 col-md-6">
            <p className="footer-title">Nhân viên</p>
            <Link to="/login">Đăng nhập</Link>
          </div>
          <div className="footer-links col-lg-3 col-md-6">
            <p className="footer-title">Kết nối</p>
            <div className="box-contact">
              <p className="contact-title">Số điện thoại:</p>
              <p>+84 258 542 336</p>
            </div>
            <div className="box-contact">
              <p className="contact-title">Địa chỉ:</p>
              <p>02 Thanh Son, Thanh Binh, Hai Chau, Da Nang</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
