import React from "react";
import { service_attr } from "../../data";

const Weight = ({ setData, data }) => {
  return (
    <div className="choose-box">
      {service_attr.map((item) => {
        return (
          <div className="box-input" key={item.id}>
            <input
              className="radio-custom"
              type="radio"
              name="weight"
              id={item.value}
              onChange={() => {
                setData({ ...data, price: item.price, weight: item.value });
              }}
            />
            <label htmlFor={item.value} className="label">
              {item.value}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Weight;
