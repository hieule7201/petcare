import React from "react";
import { service_attr } from "../data";

const Weight = ({ setData, data }) => {
  return (
    <div>
      {service_attr.map((item) => {
        return (
          <label key={item.id}>
            <input
              type="radio"
              name="weight"
              id={item.id}
              onChange={() => {
                setData({ ...data, price: item.price, weight: item.value });
              }}
            />
            {item.value}
          </label>
        );
      })}
    </div>
  );
};

export default Weight;
