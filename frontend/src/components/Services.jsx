import React from "react";
import { service_lists } from "../data";
import img_card_default from "../assets/img/service_default.jpg";

const Services = () => {
  return (
    <div className="container services-container">
      <h2 className="services-header">Services</h2>
      <div className="services-lists">
        {service_lists.map(({ id, name, img, short_desc }) => {
          return (
            <div className="services-card" key={id}>
              <div className="services-card_img">
                <img src={img ? img : img_card_default} alt="" />
              </div>
              <div className="services-card_info">
                <h5 className="services-card_name">{name}</h5>
                <p className="services-card_short_desc">{short_desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
