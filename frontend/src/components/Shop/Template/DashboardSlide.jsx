import React from "react";
import "./dashboard_slide.css";
import { Link } from "react-router-dom";
const DashboardSlide = ({ active }) => {
  return (
    <>
      <div className="d_slide-container">
        <div className={`d_service ${active === 1 ? "active" : ""}`}>
          <Link to="/shop" className="d_link">
            Đặt dịch vụ
          </Link>
        </div>
        <div className={`d_service ${active === 2 ? "active" : ""}`}>
          <Link to="/shop/order_info" className="d_link">
            Chi tiết đặt dịch vụ
          </Link>
        </div>
        <div className={`d_service ${active === 4 ? "active" : ""}`}>
          <Link to="/shop/cus_info" className="d_link">
            Thông tin khách hàng
          </Link>
        </div>
        <div className={`d_service ${active === 5 ? "active" : ""}`}>
          <Link to="/shop/staff_setting" className="d_link">
            Cài đặt
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardSlide;
