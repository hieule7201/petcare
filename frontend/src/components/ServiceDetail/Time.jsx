import React from "react";

const Time = ({ times, data, setData }) => {
  return (
    <div className="choose-box">
      {times.map((props) => {
        return (
          <div key={props._id} className="box-input">
            <input
              disabled={props.total === 0 ? true : false}
              className="radio-custom"
              type="radio"
              name="time"
              id={props._id}
              onChange={() => {
                setData({ ...data, time_come: props.value });
              }}
            />
            <label className="label" htmlFor={props._id}>
              {props.value}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Time;
