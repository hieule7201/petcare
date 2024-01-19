import "./navbar.css";
import { links } from "../data";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/img/pawprint.png";
import { BiSearch, BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth.login);
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="m-navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo m-navbar-link">
          <img src={Logo} alt="" />
          <h3 className="logo">Petty</h3>
        </Link>
        <div className={`m-navbar-links ${showNav ? "showNav" : "hideNav"}`}>
          <AiOutlineClose className="close" onClick={() => setShowNav(false)} />
          {links.map(({ name, path }, index) => {
            return (
              <div key={index} className="">
                <NavLink
                  to={path}
                  onClick={() => setShowNav(false)}
                  className={`m-navbar-link ${({ isActive }) =>
                    isActive ? "m-active" : ""}`}
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
