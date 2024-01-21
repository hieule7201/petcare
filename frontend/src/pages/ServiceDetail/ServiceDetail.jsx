import React, { useEffect, useState } from "react";
import FormBooking from "../../components/ServiceDetail/FormBooking";
import { useLocation } from "react-router-dom";
import Long from "../../components/ServiceDetail/Long";
import Weight from "../../components/ServiceDetail/Weight";
import Time from "../../components/ServiceDetail/Time";
import Navbar from "../../components/Navbar";
import "./serviceDetail.css";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import { DatePicker } from "@mui/x-date-pickers";
import { viVN } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { findDateByService } from "../../api/datetime";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { addCount, addCus, getCusByPhone } from "../../api/customer";
import { addOrder } from "../../api/order";
import Swal from "sweetalert2";
import { URL_IMG } from "../../api/config";

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
  console.log(data);

  const getDate = async () => {
    try {
      const getDate = await findDateByService(location.state._id);
      setDates(getDate.data.data);
    } catch (error) {
      toast.error(error.data?.response.message);
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
              status: "Chờ xác nhận",
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
              status: "Chờ xác nhận",
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
      <Navbar />

      <div className="m-container detail-container">
        <div
          className="card bg-dark text-white overflow-hidden border-0"
          style={{ height: "20rem" }}
        >
          <img
            src={URL_IMG + location.state.img}
            alt=""
            className="card-img"
            style={{ marginTop: "-10rem" }}
          />
          <div
            className="card-img-overlay d-flex flex-column align-items-center justify-content-center"
            style={{ background: "rgba(0,0,0,.2)" }}
          >
            <h3>{location.state.name}</h3>
            <p>{location.state.des}</p>
          </div>
        </div>

        <div className="detail-left">
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
                        date_come: new Date(value).toLocaleDateString("vi-VN"),
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
              <InputLabel id="demo-simple-select-label">Ngày đến</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.date_come}
                label="Ngày đến"
                onChange={(event) => {
                  setData({
                    ...data,
                    date_come: event.target.value,
                  });
                }}
              >
                {dates
                  .filter(
                    (value) =>
                      new Date(value.date).getDate() > new Date().getDate() - 1
                  )
                  .map((item) => {
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

          {data.date_come &&
          location.state &&
          location.state._id !== "658befc7cc5968df9f28604e" ? (
            <Weight
              prices={location.state.weights}
              setData={setData}
              data={data}
            />
          ) : (
            <Long hairs={location.state.hairs} setData={setData} data={data} />
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

      <Footer />
    </>
  );
};

export default ServiceDetail;
