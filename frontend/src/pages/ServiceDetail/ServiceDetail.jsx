import React, { useState } from "react";
import FormBooking from "../../components/Service/FormBooking";
import { useLocation } from "react-router-dom";
import Long from "../../components/Service/Long";
import Weight from "../../components/Service/Weight";
import Time from "../../components/Service/Time";
import Navbar from "../../components/Navbar";
import "./serviceDetail.css";
import PrimaryButton from "../../UI/PrimaryButton";

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
  return (
    <>
      <Navbar />

      <div className="container detail-container">
        <div
          className="detail-right"
          style={{
            backgroundImage: ` url("https://mcdn.coolmate.me/uploads/November2021/spa-thu-cung-la-gi-26.jpg")`,
          }}
        >
          <h3>Service Detail</h3>
        </div>

        <div className="detail-left">
          <h5>{location.state.name}</h5>
          {location.state && location.state.id !== "2" ? (
            <Weight setData={setData} data={data} />
          ) : (
            <Long setData={setData} data={data} />
          )}
          <Time setData={setData} data={data} />

          <div className="box-date">
            <div className="box-date">
              <p>from</p>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="input-date"
                onChange={(e) => {
                  setData({ ...data, date_come: e.target.value });
                }}
              />
            </div>
            {location.state && location.state.id === "5" ? (
              <div className="box-date">
                to
                <input
                  type="date"
                  className="input-date"
                  placeholder="dd-mm-yyyy"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    setData({ ...data, date_end: e.target.value });
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <FormBooking setData={setData} data={data} />
          {data.price ? data.price : ""}
          {console.log(data)}
          <div className="box-button" style={{ marginBottom: "10px" }}>
            <PrimaryButton title="Submit" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
