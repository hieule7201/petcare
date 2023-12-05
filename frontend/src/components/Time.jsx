import React from "react";
import { time_come } from "../data";

const Time = ({ data, setData }) => {
  return (
    <div className="time_come">
      {time_come.map((props) => {
        return (
          <label key={props.id}>
            <input
              type="radio"
              name="time"
              id={props.id}
              onChange={() => {
                setData({ ...data, time_come: props.value });
              }}
            />
            {props.value}
          </label>
        );
      })}
    </div>
  );
};

export default Time;
