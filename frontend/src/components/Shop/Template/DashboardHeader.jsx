import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/img/pawprint.png";
import { FaRegUserCircle } from "react-icons/fa";
import "./dashboard.css";

const DashboardHeader = () => {
  return (
    <>
      <div className="dashboard_header">
        <div className="container d_header-container">
          <Link to="/shop" className="navbar-logo">
            <img src={Logo} alt="" />
            <h3 className="logo">Petty</h3>
          </Link>
          <div className="box-user">
            <FaRegUserCircle className="d_user_icon" />
            <div className="box-logout">
              <Link>Log out</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
