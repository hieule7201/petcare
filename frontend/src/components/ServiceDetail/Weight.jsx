import React from "react";

const Weight = ({ prices, setData, data }) => {
  return (
    <div className="choose-box">
      {prices.map((item) => {
        return (
          <div className="box-input" key={item.value}>
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
