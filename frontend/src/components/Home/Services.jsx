import React from "react";
import img_card_default from "../../assets/img/service_default.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Services = () => {
  const navigate = useNavigate();
  const service = useSelector((state) => state.service);
  return (
    <div className="container services-container">
      <h2 className="">Các dịch vụ</h2>
      <div className="row ">
        {service.services.map(({ _id, name, img, des }, index) => {
          return (
            <button
              onClick={() => {
                navigate(`/service/${_id}`, {
                  state: service.services[index],
                });
              }}
              className="col-lg-6 col-md-6 col p-0 bg-white "
            >
              <div className="card bg-dark text-white border-0 m-3 " key={_id}>
                <img
                  src={img ? img : img_card_default}
                  alt=""
                  className="card-img"
                />
                <div
                  className="card-img-overlay d-flex flex-column justify-content-end align-items-start"
                  style={{ background: "rgba(0 ,0, 0, .2)" }}
                >
                  <h5 className="card-title text-left">{name}</h5>
                  <p className="card-text text-left">{des}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
