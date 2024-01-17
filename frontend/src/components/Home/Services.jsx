import React from "react";
import img_card_default from "../../assets/img/service_default.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Services = () => {
  const navigate = useNavigate();
  const service = useSelector((state) => state.service);
  return (
    <div className="container services-container">
      <h2 className="services-header">Các dịch vụ</h2>
      <div className="services-lists">
        {service.services.map(({ _id, name, img, des }, index) => {
          return (
            <button
              onClick={() => {
                navigate(`/service/${_id}`, {
                  state: service.services[index],
                });
              }}
              className="m-card"
              key={_id}
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
  );
};

export default Services;
