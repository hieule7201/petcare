import React from "react";
import { useNavigate } from "react-router-dom";
import { service_lists } from "../../data";
import img_card_default from "../../assets/img/service_default.jpg";
import Navbar from "../../components/Navbar";
import "./service.css";
import Footer from "../../components/Footer";
const Service = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="service">
        <div className="box-header">
          <h2 className="service-header">Services</h2>
        </div>
        <div className="container services-lists">
          {service_lists.map(({ id, name, img, short_desc }, index) => {
            return (
              <button
                onClick={() => {
                  navigate(`/service/${id}`, { state: service_lists[index] });
                }}
                className="card"
                key={id}
              >
                <div className="card_img">
                  <img src={img ? img : img_card_default} alt="" />
                </div>
                <div className="card_info">
                  <span className="card_name">{name}</span>
                  <p className="card_short_desc">
                    {short_desc.length > 60
                      ? short_desc.slice(0, 60) + "..."
                      : short_desc}
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
