import React, { useState } from "react";
import { service_attr, service_lists } from "../../data";

const ServiceDetail = () => {
  const [test, setTest] = useState(true);
  return (
    <div className="container detail-container">
      <div className="detail-right">
        <img
          src="https://mcdn.coolmate.me/uploads/November2021/spa-thu-cung-la-gi-26.jpg"
          alt=""
        />
      </div>
      <div className="detail-left">
        <h5>{service_lists[0].name}</h5>
        {service_attr
          .filter((item) => {
            return item.key === "weight";
          })
          .map((item) => {
            return (
              <label key={item.id}>
                <input
                  type="radio"
                  name="weight"
                  id={item.id}
                  checked={test === true}
                />
                {item.value}
              </label>
            );
          })}
      </div>
    </div>
  );
};

export default ServiceDetail;
