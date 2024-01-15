import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import { get_all_service } from "../../api/service";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { viVN } from "@mui/x-date-pickers/locales";
import { addDate, findAllTime } from "../../api/datetime";
import PrimaryButton from "../../UI/PrimaryButton";

const CreateDate = () => {
  const [service, setService] = useState([]);
  const [time, setTime] = useState([]);
  let idDate = [];

  const [data, setData] = useState({
    idService: "",
    date: "",
  });
  useEffect(() => {
    getService();
    getTime();
  }, []);

  const getService = async () => {
    try {
      const getData = await get_all_service();

      setService(getData.data.data);
    } catch (error) {
      toast.error(error.data.response.message);
    }
  };
  const getTime = async () => {
    try {
      const get = await findAllTime();
      setTime(get.data.data);
    } catch (error) {
      toast.error(error.data.response.message);
    }
  };
  const handleCheck = (e) => {
    let isChecked = e.target.checked;
    if (isChecked) idDate.push(e.target.value);
    else idDate.pop(e.target.value);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await addDate({
        idService: data.idService,
        date: data.date,
        times: idDate,
      });
      window.location.reload();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.data.response.message);
    }
  };
  return (
    <>
      <DashboardHeader />
      <div className="container shop_container">
        <DashboardSlide active={6} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <FormControl sx={{ m: 1, minWidth: 400 }}>
              <InputLabel id="demo-simple-select-label">Dịch vụ</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.idService}
                label="Date come"
                onChange={(e) => {
                  setData({
                    ...data,
                    idService: e.target.value,
                  });
                }}
              >
                {service
                  .filter((value) => value._id !== "658bee74cc5968df9f286042")
                  .map((item) => {
                    return (
                      <MenuItem value={item._id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <div
              style={{
                marginTop: ".5rem",
                marginLeft: ".5rem",
                justifyContent: "center",
                display: "flex",
              }}
            >
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
                      date: new Date(value).toLocaleDateString("vi-VN"),
                    });
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="choose-box" style={{ marginTop: "1rem" }}>
            {time.map((props) => {
              return (
                <div key={props._id} className="box-input">
                  <input
                    disabled={props.total <= 0 ? true : false}
                    className="radio-custom"
                    type="checkbox"
                    value={props._id}
                    name="time"
                    id={props._id}
                    onChange={handleCheck}
                  />
                  <label className="label" htmlFor={props._id}>
                    {props.value}
                  </label>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <button className="primary-btn" onClick={handleClick}>
              <p>Xác nhận</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateDate;
