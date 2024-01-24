import React, { useEffect, useState } from "react";
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
import { findDateByService } from "../../api/datetime";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import { addCount, addCus, getCusByPhone } from "../../api/customer";
import { addOrder } from "../../api/order";

const OrderDetail = () => {
  const location = useLocation();
  const [dates, setDates] = useState([]);
  const [data, setData] = useState({
    idService: location.state._id,
    deliver: "",
    hair: "",
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
  const formatMoney = (money) => {
    if (isNaN(money)) {
      console.error("Invalid input. Please provide a valid number.");
      return "";
    }

    // Use toLocaleString with Vietnamese options
    return money.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
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

  const handleOrder = async () => {
    Swal.fire({
      title: "Bạn có chắc chắn ?",
      showCancelButton: true,
      confirmButtonText: "Đúng",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const customer = await getCusByPhone(data.phone);
          if (customer.data.data) {
            const order = await addOrder({
              customer: customer.data.data._id,
              date_come: data.date_come,
              date_end: data.date_end,
              deliver: data.deliver,
              hair: data.hair,
              services: data.idService,
              status: "Đã xác nhận",
              time_come: data.time_come,
              weight: data.weight,
              price: data.price,
            });
            await addCount(customer.data.data.phone);
            Swal.fire({
              title: order.data.message,
              icon: "success",
              timer: 3000,
            });
            window.location.reload();
          } else {
            const customer = await addCus({
              phone: data.phone,
              email: data.email,
              name: data.nameUser,
              address: data.address,
            });
            const order = await addOrder({
              customer: customer.data.data._id,
              date_come: data.date_come,
              date_end: data.date_end,
              deliver: data.deliver,
              hair: data.hair,
              services: data.idService,
              status: "Đã xác nhận",
              time_come: data.time_come,
              weight: data.weight,
              price: data.price,
            });
            Swal.fire({
              title: order.data.message,
              icon: "success",
              timer: 3000,
            });
            window.location.reload();
          }
        } catch (error) {
          Swal.fire({
            text: error.message,
            icon: "error",
            timer: 4000,
          });
        }
      }
    });
  };
  return (
    <>
      <DashboardHeader />
      <div className="mx-5  shop_container">
        <DashboardSlide active={1} />
        <div className="order-detail-container">
          <div className="staff-order-detail">
            <h5>{location.state.name}</h5>

            {location.state._id &&
            location.state._id === "658bee74cc5968df9f286042" ? (
              <div className="box-date">
                <div className="box-date">
                  <p>Từ</p>
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
                          date_come: new Date(value).toLocaleDateString(
                            "vi-VN"
                          ),
                        });
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="box-date">
                  đến
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
                  {dates
                    .filter((value) => new Date(value.date) >= new Date())
                    .map((item) => {
                      return (
                        <MenuItem
                          value={new Date(item.date).toLocaleDateString(
                            "vi-VN"
                          )}
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

            {data.date_come &&
            location.state &&
            location.state._id !== "658befc7cc5968df9f28604e" ? (
              <Weight
                prices={location.state.weights}
                setData={setData}
                data={data}
              />
            ) : (
              <Long
                hairs={location.state.hairs}
                setData={setData}
                data={data}
              />
            )}

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
                  Đón tại nhà &#40;&lt;5km&#41;
                </label>
              </div>
            </div>
            {data.price
              ? `Tổng số tiền cho dịch vụ: ${formatMoney(data.price)}`
              : ""}
            <div className="box-button" style={{ marginBottom: "10px" }}>
              <button className="primary-btn" onClick={handleOrder}>
                <p className="mb-0" style={{ color: "white", fontStyle: 700 }}>
                  Xác nhận
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
