import React from "react";
import "./dashboard_slide.css";
import { Link } from "react-router-dom";
const DashboardSlide = ({ active }) => {
  return (
    <>
      <div className="d_slide-container">
        <div className={`d_service ${active === 1 ? "active" : ""}`}>
          <Link to="/shop" className="d_link">
            Order Service
          </Link>
        </div>
        <div className={`d_service ${active === 2 ? "active" : ""}`}>
          <Link to="/order_info" className="d_link">
            Order Detail
          </Link>
        </div>
        <div className={`d_service ${active === 3 ? "active" : ""}`}>
          <Link to="/cus_order" className="d_link">
            Customer Order
          </Link>
        </div>
        <div className={`d_service ${active === 4 ? "active" : ""}`}>
          <Link to="/cus_info" className="d_link">
            Customer Detail
          </Link>
        </div>
        <div className={`d_service ${active === 5 ? "active" : ""}`}>
          <Link to="/staff_setting" className="d_link">
            Setting
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardSlide;
