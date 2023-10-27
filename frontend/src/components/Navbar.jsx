import "./navbar.css";
import { links } from "../data";
import { NavLink } from "react-router-dom";
import Logo from "../assets/img/pawprint.png";
import { BiSearch, BiSolidUser, BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <img src={Logo} alt="" />
          <h3 className="logo">Petty</h3>
        </div>
        <div className={`navbar-links ${showNav ? "showNav" : "hideNav"}`}>
          <AiOutlineClose className="close" onClick={() => setShowNav(false)} />
          {links.map(({ name, path }, index) => {
            return (
              <div key={index} className="">
                <NavLink
                  to={path}
                  onClick={() => setShowNav(false)}
                  className={`navbar-link ${({ isActive }) =>
                    isActive ? "active" : ""}`}
                >
                  {name}
                </NavLink>
              </div>
            );
          })}
        </div>
        <div className="navbar-icon">
          <div className="search-icon">
            <BiSearch />
          </div>
          <div className="user-icon">
            <BiSolidUser />
            <div className="navbar-subnav_login">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
          </div>
          <div className="menu-icon">
            <BiMenu
              onClick={() => {
                setShowNav((showNav) => !showNav);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
