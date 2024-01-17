import React from "react";
import { useNavigate } from "react-router-dom";
import img_card_default from "../../assets/img/service_default.jpg";
import Navbar from "../../components/Navbar";
import "./service.css";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
const Service = () => {
  const navigate = useNavigate();
  const service = useSelector((state) => state.service);
  return (
    <>
      <Navbar />
      <div className="service">
        <div className="box-header">
          <h2 className="service-header">Các dịch vụ</h2>
        </div>
        <div className="container services-lists">
          {service.services.map(({ _id, name, img, des }, index) => {
            return (
              <button
                onClick={() => {
                  navigate(`/service/${_id}`, {
                    state: service.services[index],
                  });
                }}
                className="m-card"
                key={index}
              >
                <div className="card_img">
                  <img src={img ? img : img_card_default} alt="" />
                </div>
                <div className="card_info">
                  <span className="card_name">{name}</span>
                  <p className="card_short_desc">
                    {des.length > 50 ? des.slice(0, 50) + "..." : des}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Service;
