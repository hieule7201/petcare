import React, { useEffect, useState } from "react";
import "./dashboard_slide.css";
import { Link, useNavigate } from "react-router-dom";
import { get_user } from "../../../api/user";
import { toast } from "react-toastify";
const DashboardSlide = ({ active }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  useEffect(() => {
    loadUser();
  }, []);
  const handleSignOut = () => {
    document.cookie =
      "token=12121; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };
  const loadUser = async () => {
    try {
      const res = await get_user();
      setUser(res.data.data);
      // console.log(res.data);
    } catch (error) {
      // dispatch(loginFail());
      toast.error(error.response?.data.message);
    }
  };

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
        {user && user.key_role === "R1" ? (
          <div className={`d_service ${active === 5 ? "active" : ""}`}>
            <Link to="/shop/date_time" className="d_link">
              Quản lý ngày giờ
            </Link>
          </div>
        ) : (
          ""
        )}
        {user && user.key_role === "R1" ? (
          <div className={`d_service ${active === 6 ? "active" : ""}`}>
            <Link to="/shop/create_date" className="d_link">
              Tạo ngày phục vụ
            </Link>
          </div>
        ) : (
          ""
        )}
        {user && user.key_role === "R1" ? (
          <div className={`d_service ${active === 7 ? "active" : ""}`}>
            <Link to="/shop/service_manage" className="d_link">
              Quản lý dịch vụ
            </Link>
          </div>
        ) : (
          ""
        )}

        <div className={`d_service ${active === 8 ? "active" : ""}`}>
          <Link to="/shop/invoice_manage" className="d_link">
            Quản lý hóa đơn
          </Link>
        </div>
        {user && user.key_role === "R1" ? (
          <div className={`d_service ${active === 9 ? "active" : ""}`}>
            <Link to="/shop/statistical" className="d_link">
              Thống kê
            </Link>
          </div>
        ) : (
          ""
        )}

        <div className="d_service" onClick={handleSignOut}>
          <p className="d_link">Đăng xuất</p>
        </div>
      </div>
    </>
  );
};

export default DashboardSlide;
