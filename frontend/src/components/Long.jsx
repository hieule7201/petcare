import React, { useState } from "react";
import { long } from "../data";

const Long = ({ setData, data }) => {
  const [choose, setChoose] = useState(0);
  return (
    <div>
      {long.map((props) => {
        return (
          <label key={props.id}>
            <input
              type="radio"
              name="name"
              onChange={() => {
                setChoose(props);
                setData({ ...data, style_long: props.name });
              }}
            />
            {props.name}
          </label>
        );
      })}
      {choose &&
        choose.weight.map((weight) => {
          return (
            <label key={weight.id}>
              <input
                type="radio"
                name="weight"
                onChange={() => {
                  setData({
                    ...data,
                    price: weight.price,
                    weight: weight.value,
                  });
                }}
              />
              {weight.value} - {weight.price}
            </label>
          );
        })}
    </div>
  );
};

export default Long;
