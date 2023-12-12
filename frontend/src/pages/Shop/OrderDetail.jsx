import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Weight from "../../components/ServiceDetail/Weight";
import Long from "../../components/ServiceDetail/Long";
import Time from "../../components/ServiceDetail/Time";
import FormBooking from "../../components/ServiceDetail/FormBooking";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";
import PrimaryButton from "../../UI/PrimaryButton";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";

const OrderDetail = () => {
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
      <DashboardHeader />
      <div className="container shop_container">
        <DashboardSlide active={1} />
        <div className="order-detail-container">
          <div className="staff-order-detail">
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
      </div>
    </>
  );
};

export default OrderDetail;
