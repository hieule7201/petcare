import React, { useEffect, useState } from "react";
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
import { findDateByService } from "../../api/datetime";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ServiceDetail = () => {
  const location = useLocation();
  const [dates, setDates] = useState([]);

  const [data, setData] = useState({
    idService: location.state._id,
    hair: "",
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
  useEffect(() => {
    getDate();
  }, []);

  const getDate = async () => {
    try {
      const getDate = await findDateByService(location.state._id);
      setDates(getDate.data.data);
    } catch (error) {
      console.log(error.data.response.message);
    }
  };
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
          location.state._id !== "658befc7cc5968df9f28604e" ? (
            <Weight
              prices={location.state.weights}
              setData={setData}
              data={data}
            />
          ) : (
            <Long hairs={location.state.hairs} setData={setData} data={data} />
          )}
          {location.state._id &&
          location.state._id === "658bee74cc5968df9f286042" ? (
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
            </div>
          ) : (
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-label">Date come</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.date_come}
                label="Date come"
                onChange={(event) => {
                  setData({
                    ...data,
                    date_come: event.target.value,
                  });
                }}
              >
                {dates.map((item) => {
                  return (
                    <MenuItem
                      value={new Date(item.date).toLocaleDateString("vi-VN")}
                      key={item.id}
                    >
                      {new Date(item.date).toLocaleDateString("vi-VN")}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}

          {dates
            .filter(
              (item) =>
                data.date_come &&
                data.date_come ===
                  new Date(item.date).toLocaleDateString("vi-VN")
            )
            .map((value) => {
              return (
                <Time
                  key={value.times.id}
                  times={value.times}
                  setData={setData}
                  data={data}
                />
              );
            })}

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
