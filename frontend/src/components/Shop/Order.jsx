import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img_card_default from "../../assets/img/service_default.jpg";
import { useSelector } from "react-redux";

const Order = () => {
  const navigate = useNavigate();
  const service = useSelector((state) => state.service);
  function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split("; ");
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
  }
  useEffect(() => {
    if (!getCookie("token")) navigate("/login");
  }, []);
  return (
    <div className="order-container">
      <div className="row">
        {service.services.map(({ _id, name, img, des }, index) => {
          return (
            <button
              onClick={() => {
                navigate(`/shop/${_id}`, {
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
                  <p className="card-text text-left">
                    {" "}
                    {des.length > 60 ? des.slice(0, 60) + "..." : des}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
