import React from "react";
import { useNavigate } from "react-router-dom";
import img_card_default from "../../assets/img/service_default.jpg";
import { useSelector } from "react-redux";

const Order = () => {
  const navigate = useNavigate();
  const service = useSelector((state) => state.service);
  return (
    <div className="order-container">
      <div className="order-lists">
        {service.services.map(({ _id, name, img, des }, index) => {
          return (
            <button
              onClick={() => {
                navigate(`/shop/${_id}`, { state: service.services[index] });
              }}
              className="card"
              key={_id}
            >
              <div className="card_img">
                <img src={img ? img : img_card_default} alt="" />
              </div>
              <div className="card_info">
                <span className="card_name">{name}</span>
                <p className="card_short_desc">
                  {des.length > 60 ? des.slice(0, 60) + "..." : des}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
