import React from "react";
import { service_lists } from "../../data";
import img_card_default from "../../assets/img/service_default.jpg";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  return (
    <div className="container services-container">
      <h2 className="services-header">Services</h2>
      <div className="services-lists">
        {service_lists.map(({ id, name, img, short_desc }, index) => {
          return (
            <button
              onClick={() => {
                navigate(`/service/${id}`, { state: service_lists[index] });
              }}
              className="services-card"
              key={id}
            >
              <div className="services-card_img">
                <img src={img ? img : img_card_default} alt="" />
              </div>
              <div className="services-card_info">
                <span className="services-card_name">{name}</span>
                <p className="services-card_short_desc">
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
  );
};

export default Services;
