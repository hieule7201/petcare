import React, { useState } from "react";
import FormBooking from "../../components/FormBooking";
import { useLocation } from "react-router-dom";
import Long from "../../components/Long";
import Spices from "../../components/Spices";
import Weight from "../../components/Weight";
import Time from "../../components/Time";

const ServiceDetail = () => {
  const location = useLocation();
  const [data, setData] = useState({
    nameService: location.state.name,
    spices: "",
    style_long: "",
    weight: "",
    time_come: "",
    date_come: "",
    date_end: "",
    nameUser: "",
    phone: "",
    email: "",
    address: "",
    price: "",
  });
  console.log(location.state);
  return (
    <div className="container detail-container">
      <div className="detail-right">
        <img
          src="https://mcdn.coolmate.me/uploads/November2021/spa-thu-cung-la-gi-26.jpg"
          alt=""
        />
      </div>

      <div className="detail-left">
        <h5>{location.state.name}</h5>
        <Spices data={data} setData={setData} />
        {location.state && location.state.id !== "2" ? (
          <Weight setData={setData} data={data} />
        ) : (
          <Long setData={setData} data={data} />
        )}
        <Time setData={setData} data={data} />
        {location.state && location.state.id === "5" ? (
          <div className="time_come">
            <input
              type="date"
              onChange={(e) => {
                setData({ ...data, date_come: e.target.value });
              }}
            />
            <input
              type="date"
              onChange={(e) => {
                setData({ ...data, date_end: e.target.value });
              }}
            />
          </div>
        ) : (
          <div className="time_come">
            <input
              type="date"
              onChange={(e) => {
                setData({ ...data, date_come: e.target.value });
              }}
            />
          </div>
        )}

        <div className="form-booking">
          <FormBooking setData={setData} data={data} />
        </div>
        {data.price ? data.price : ""}
        {console.log(data)}
        <button>Submit</button>
      </div>
    </div>
  );
};

export default ServiceDetail;
