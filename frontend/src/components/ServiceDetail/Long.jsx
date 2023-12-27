import React, { useState } from "react";

const Long = ({ hairs, setData, data }) => {
  const [choose, setChoose] = useState("");
  return (
    <div className="box-long">
      <div className="choose-box">
        {hairs.map((props) => {
          return (
            <div className="box-input" key={props.value}>
              <input
                className="radio-custom"
                type="radio"
                name="name"
                id={props.name}
                onChange={() => {
                  setChoose(props);
                  setData({ ...data, style_long: props.name });
                }}
              />
              <label className="label" htmlFor={props.name}>
                {props.name}
              </label>
            </div>
          );
        })}
      </div>
      <div className="choose-box">
        {choose &&
          choose.weight.map((weight) => {
            return (
              <div className="box-input" key={weight.value}>
                <input
                  type="radio"
                  name="weight"
                  className="radio-custom"
                  id={weight.value}
                  onChange={() => {
                    setData({
                      ...data,
                      price: weight.price,
                      weight: weight.value,
                    });
                  }}
                />
                <label htmlFor={weight.value} className="label">
                  {weight.value}
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Long;
