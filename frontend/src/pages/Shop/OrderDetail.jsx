import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Weight from "../../components/ServiceDetail/Weight";
import Long from "../../components/ServiceDetail/Long";
import Time from "../../components/ServiceDetail/Time";
import FormBooking from "../../components/ServiceDetail/FormBooking";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";
import PrimaryButton from "../../UI/PrimaryButton";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { viVN } from "@mui/x-date-pickers/locales";

const OrderDetail = () => {
  const location = useLocation();
  const [data, setData] = useState({
    idService: location.state._id,
    deliver: "",
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
      <DashboardHeader />
      <div className="container shop_container">
        <DashboardSlide active={1} />
        <div className="order-detail-container">
          <div className="staff-order-detail">
            <h5>{location.state.name}</h5>

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
              {location.state &&
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
      </div>
    </>
  );
};

export default OrderDetail;
