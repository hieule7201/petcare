import React from "react";
import { time_come } from "../../data";

const Time = ({ data, setData }) => {
  return (
    <div className="choose-box">
      {time_come.map((props) => {
        return (
          <div key={props.id} className="box-input">
            <input
              className="radio-custom"
              type="radio"
              name="time"
              id={props.id}
              onChange={() => {
                setData({ ...data, time_come: props.value });
              }}
            />
            <label className="label" htmlFor={props.id}>
              {props.value}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Time;
