import React from "react";
import { spices } from "../data";

const Spices = ({ data, setData }) => {
  return (
    <>
      {spices.map((props) => {
        return (
          <label key={props.id}>
            <input
              type="radio"
              name="spices"
              onChange={() => {
                setData({ ...data, spices: props.name });
              }}
            />
            {props.name}
          </label>
        );
      })}
    </>
  );
};

export default Spices;
