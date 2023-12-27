import React, { useState } from "react";
import FormBooking from "../../components/ServiceDetail/FormBooking";
import { useLocation } from "react-router-dom";
import Long from "../../components/ServiceDetail/Long";
import Weight from "../../components/ServiceDetail/Weight";
import Time from "../../components/ServiceDetail/Time";
import Navbar from "../../components/Navbar";
import "./serviceDetail.css";
import PrimaryButton from "../../UI/PrimaryButton";
import Footer from "../../components/Footer";
import { DatePicker } from "@mui/x-date-pickers";
import { viVN } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ServiceDetail = () => {
  const location = useLocation();
  console.log(location.number);
  const [data, setData] = useState({
    idService: location.state._id,
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
    deliver: "",
  });
  return (
    <>
      <Navbar />

      <div className="container detail-container">
        <div
          className="detail-right"
          style={{
            backgroundImage: ` url("${location.state.img}")`,
          }}
        >
          <div className="box-title">
            <h3>{location.state.name}</h3>
            <p>{location.state.des}</p>
          </div>
        </div>

        <div className="detail-left">
          {location.state &&
          location.state._id !== "6580473510a908b128352912" ? (
            <Weight setData={setData} data={data} />
          ) : (
            <Long setData={setData} data={data} />
          )}
          <Time setData={setData} data={data} />

          <div className="box-date">
            <div className="box-date">
              <p>from</p>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={
                  viVN.components.MuiLocalizationProvider.defaultProps
                    .localeText
                }
              >
                <DatePicker
                  disablePast
                  // localeText={}
                  value={data.date_come}
                  format="DD/MM/YYYY"
                  onChange={(value) => {
                    setData({
                      ...data,
                      date_come: new Date(value).toLocaleDateString("vi-VN"),
                    });
                  }}
                />
              </LocalizationProvider>
            </div>
            {location.state._id &&
            location.state._id === "658047f210a908b128352916" ? (
              <div className="box-date">
                to
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  localeText={
                    viVN.components.MuiLocalizationProvider.defaultProps
                      .localeText
                  }
                >
                  <DatePicker
                    disablePast
                    value={data.date_end}
                    format="DD/MM/YYYY"
                    onChange={(value) => {
                      setData({
                        ...data,
                        date_end: new Date(value).toLocaleDateString("vi-VN"),
                      });
                    }}
                  />
                </LocalizationProvider>
              </div>
            ) : (
              ""
            )}
          </div>

          <FormBooking setData={setData} data={data} />
          <div className="choose-box">
            <div className="box-input">
              <input
                className="radio-custom"
                type="radio"
                name="deliver"
                id="yourself"
                onChange={() => {
                  setData({ ...data, deliver: "Tự đến" });
                }}
              />
              <label htmlFor="yourself" className="label">
                Tự đến
              </label>
            </div>
            <div className="box-input">
              <input
                className="radio-custom"
                type="radio"
                name="deliver"
                id="at_home"
                onChange={() => {
                  setData({ ...data, deliver: "Đón tại nhà" });
                }}
              />
              <label htmlFor="at_home" className="label">
                Đón tại nhà
              </label>
            </div>
          </div>
          {data.price ? data.price : ""}
          {console.log(data)}
          <div className="box-button" style={{ marginBottom: "10px" }}>
            <PrimaryButton type="submit">
              <p style={{ color: "white", fontStyle: 700 }}>Xác nhận</p>
            </PrimaryButton>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ServiceDetail;
