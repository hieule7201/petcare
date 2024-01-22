import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";
import { getAllOrders, editStatus, updateOrder } from "../../api/order.js";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Swal from "sweetalert2";
import { findAllTime, findDateByService } from "../../api/datetime.js";
import { DatePicker } from "@mui/x-date-pickers";
import { viVN } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { find_service_by_id } from "../../api/service.js";
import { addInvoice } from "../../api/invoice.js";

const OrderInfo = () => {
  const status = ["Chờ xác nhận", "Đã xác nhận", "Đã hoàn thành", "Đã hủy"];
  const columns = [
    { id: "id", name: "STT" },
    { id: "name", name: "Tên khách hàng" },
    { id: "status", name: "Trạng thái" },
    { id: "time_come", name: "Thời gian đến" },
    { id: "date_come", name: "Ngày đến" },
    { id: "date_end", name: "Ngày đi" },
    { id: "service", name: "Tên dịch vụ" },
    { id: "deliver", name: "Đưa đón" },
    { id: "price", name: "Giá tiền" },
    { id: "action", name: "Thao tác" },
  ];
  useEffect(() => {
    getAll();
    getTime();
    getService();
  }, []);
  const [date, setDate] = useState([]);
  const [date_come, setDate_come] = useState("");
  const [date_end, setDate_end] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [time, setTime] = useState([]);
  const [prices, setPrices] = useState(0);
  const [weight, setWeight] = useState([]);
  const [order, setOrder] = useState([]);
  const [editOrder, setEditOrder] = useState({});
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [page, pageChange] = useState(0);
  const [rowPage, rowPageChange] = useState(5);
  const handlePageChange = (event, newPage) => {
    pageChange(newPage);
  };
  const handleRowPerPage = (event) => {
    rowPageChange(+event.target.value);
    pageChange(0);
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

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
  const getAll = async () => {
    try {
      const response = await getAllOrders();
      setOrder(response.data.data);
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        timer: 3000,
      });
    }
  };
  const getTime = async () => {
    try {
      const response = await findAllTime();
      setTime(response.data.data);
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        timer: 3000,
      });
    }
  };
  const getService = async () => {
    try {
      const response = await find_service_by_id("658bee74cc5968df9f286042");
      setWeight(response.data.data.weights);
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        timer: 3000,
      });
    }
  };
  const getDateByIdService = async (idService) => {
    try {
      const response = await findDateByService(idService);
      setDate(response.data.data);
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        timer: 3000,
      });
    }
  };
  const getPrice = (item) => {
    weight
      .filter((value) => value.value === item)
      .forEach((value) => {
        setPrices(value.price);
      });
  };
  const setPrice = () => {
    const [day, month, year] = date_come.split("/");
    const date1 = new Date(year, month - 1, day);
    const [day1, month1, year1] = date_end.split("/");
    const date2 = new Date(year1, month1 - 1, day1);
    const totalDate =
      (date2 - date1) / (1000 * 60 * 60 * 24) !== 0
        ? (date2 - date1) / (1000 * 60 * 60 * 24)
        : 1;

    console.log((date2 - date1) / (1000 * 60 * 60 * 24));
    if (totalDate * prices < 0) {
      setDate_end(formatDate(editOrder.date_end));
      Swal.fire({
        icon: "error",
        text: "Ngày đi phải lớn hơn ngày đến",
        timer: 4000,
      });
    } else {
      setEditOrder({ ...editOrder, price: totalDate * prices });
    }
  };
  console.log(date_come, date_end, prices);
  const setStatus = async (id, status) => {
    Swal.fire({
      title: "Bạn có chắc chắn ?",
      showCancelButton: true,
      confirmButtonText: "Đúng",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await editStatus(id, { status: status });
          getAll();
          Swal.fire({
            title: response.data.message,
            icon: "success",
            timer: 3000,
          });
        } catch (error) {
          Swal.fire({
            title: error.message,
            icon: "error",
            timer: 3000,
          });
        }
      }
    });
  };
  const handleDone = async (id, price, status) => {
    Swal.fire({
      title: "Hoàn thành và tạo hóa đơn ?",
      showCancelButton: true,
      confirmButtonText: "Đúng",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await addInvoice({
            order: id,
            invoice_amount: price,
          });
          await editStatus(id, { status: status });
          getAll();
          reset();
          Swal.fire({
            title: response.data.message,
            icon: "success",
            timer: 3000,
          });
        } catch (error) {
          Swal.fire({
            title: error.message,
            icon: "error",
            timer: 3000,
          });
        }
      }
    });
  };
  const handleSubmit = async () => {
    Swal.fire({
      title: "Bạn có chắc chắn ?",
      showCancelButton: true,
      confirmButtonText: "Đúng",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await updateOrder(editOrder._id, {
            hair: editOrder.hair,
            time_come: editOrder.time_come,
            date_come: date_come,
            date_end: date_end,
            price: editOrder.price,
            deliver: editOrder.deliver,
          });
          getAll();
          setIsShow(false);
          reset();
          Swal.fire({
            title: response.data.message,
            icon: "success",
            timer: 3000,
          });
        } catch (error) {
          Swal.fire({
            title: error.message,
            icon: "error",
            timer: 3000,
          });
        }
      }
    });
  };
  const handleReset = () => {
    setSearchName("");
    setSearchStatus("");
  };
  const reset = () => {
    setEditOrder({});
  };
  return (
    <>
      <DashboardHeader />
      <div className="mx-5 shop_container">
        <DashboardSlide active={2} />
        <div className="d-flex flex-column w-100">
          <div className="w-100">
            <h2 className="text-center mb-3">Quản lý đặt dịch vụ</h2>
            <div className="w-100 d-flex justify-content-end m-3">
              <div className="form-input p-2">
                <button className="btn btn-info h-100" onClick={handleReset}>
                  ↺ Cài lại
                </button>
              </div>
              <div className="form-input p-2">
                <input
                  type="search"
                  placeholder="Nhập tên khách hàng"
                  className="form-control h-100"
                  value={searchName}
                  onChange={(e) => {
                    setSearchName(e.target.value);
                  }}
                />
              </div>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">
                  Trạng thái
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Trạng thái"
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
                >
                  {status.map((item, index) => {
                    return (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <Paper sx={{ width: "100%", marginLeft: "1.25rem" }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: "var(--color-primary)" }}>
                      {columns.map((item) => {
                        return (
                          <TableCell
                            key={item.id}
                            sx={{
                              color: "white",
                              fontWeight: 500,
                              textAlign: "center",
                              fontSize: "1rem",
                            }}
                            scope="col"
                          >
                            {item.name}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order
                      .filter(
                        (value) =>
                          value.customer?.name
                            .toLowerCase()
                            .indexOf(searchName.toLowerCase()) !== -1
                      )
                      .filter(
                        (value) => value.status.indexOf(searchStatus) !== -1
                      )
                      .slice(page * rowPage, page * rowPage + rowPage)
                      .map((item, index) => {
                        return (
                          <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.customer?.name}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.time_come}</TableCell>
                            <TableCell>{formatDate(item.date_come)}</TableCell>
                            <TableCell>{formatDate(item.date_end)}</TableCell>
                            <TableCell>{item.services?.name}</TableCell>
                            <TableCell>{item.deliver}</TableCell>
                            <TableCell>{formatMoney(item.price)}</TableCell>
                            <TableCell>
                              {item.status === "Chờ xác nhận" ? (
                                <div
                                  className="d-flex"
                                  style={{ gap: ".5rem" }}
                                >
                                  <button
                                    className="btn btn-info"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setIsShow(true);
                                      setEditOrder(item);
                                      getDateByIdService(item.services._id);
                                      setDate_come(formatDate(item.date_come));
                                      setDate_end(formatDate(item.date_end));
                                      getPrice(item.weight);
                                    }}
                                  >
                                    ☑
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      setStatus(item._id, "Đã hủy");
                                    }}
                                  >
                                    ✖
                                  </button>
                                </div>
                              ) : item.status === "Đã xác nhận" ? (
                                <div
                                  className="d-flex"
                                  style={{ gap: ".5rem" }}
                                >
                                  <button
                                    className="btn btn-success"
                                    onClick={() => {
                                      handleDone(
                                        item._id,
                                        item.price,
                                        "Đã hoàn thành"
                                      );
                                    }}
                                  >
                                    ✔
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      setStatus(item._id, "Đã hủy");
                                    }}
                                  >
                                    ✖
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    setShowDetail(true);
                                    setEditOrder(item);
                                  }}
                                >
                                  Chi tiết
                                </button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                sx={{ marginBottom: 0 }}
                rowsPerPageOptions={[5, 10, 15]}
                page={page}
                rowsPerPage={rowPage}
                component="div"
                count={order.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowPerPage}
                labelRowsPerPage="Số hàng"
                labelDisplayedRows={({ from, to, count }) => {
                  return `${from}–${to} của ${
                    count !== -1 ? count : `hơn ${to}`
                  }`;
                }}
              ></TablePagination>
            </Paper>
          </div>
        </div>
        {isShow ? (
          <div className="b-modal">
            <div className="modal-content container">
              <div className="modal-header">
                <h4>Thông tin đặt dịch vụ</h4>
                <span
                  className="is-close"
                  onClick={() => {
                    setIsShow((isShow) => !isShow);
                    reset();
                  }}
                >
                  &times;
                </span>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="name">Tên khách hàng</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      defaultValue={editOrder.customer?.name}
                    />
                  </div>

                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="time_come">Thời gian đến</label>
                    <select
                      className="form-control"
                      name="time"
                      id=""
                      defaultValue={editOrder.time_come}
                      onChange={(e) =>
                        setEditOrder({
                          ...editOrder,
                          time_come: e.target.value,
                        })
                      }
                    >
                      {time.map((time) => {
                        return (
                          <option key={time._id} value={time.value}>
                            {time.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {editOrder.services._id === "658bee74cc5968df9f286042" ? (
                    <div className="col-lg-4 col-md-4 ">
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <label htmlFor="date_come">Ngày đến</label>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            localeText={
                              viVN.components.MuiLocalizationProvider
                                .defaultProps.localeText
                            }
                          >
                            <DatePicker
                              disablePast
                              // localeText={}
                              format="DD/MM/YYYY"
                              defaultValue={dayjs(editOrder.date_come)}
                              // value={date_come}
                              onChange={(value) => {
                                setDate_come(formatDate(value));
                              }}
                              onAccept={() => setPrice()}
                            />
                          </LocalizationProvider>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <label htmlFor="date_end">Ngày đi</label>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            localeText={
                              viVN.components.MuiLocalizationProvider
                                .defaultProps.localeText
                            }
                          >
                            <DatePicker
                              disablePast
                              // localeText={}
                              defaultValue={dayjs(editOrder.date_end)}
                              // value={date_end}
                              format="DD/MM/YYYY"
                              onChange={(value) => {
                                setDate_end(formatDate(value));
                              }}
                              onAccept={() => setPrice()}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-lg-4 col-md-4 ">
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <label htmlFor="date_come">Ngày đến</label>
                          <select
                            id=""
                            name="date_come"
                            className="form-control"
                            defaultValue={editOrder.date_come}
                            onChange={(e) => {
                              setEditOrder({
                                ...editOrder,
                                date_come: e.target.value,
                                date_end: e.target.value,
                              });
                              setDate_come(formatDate(e.target.value));
                              setDate_end(formatDate(e.target.value));
                            }}
                          >
                            {date.map((item) => {
                              return (
                                <option key={item._id} value={item.date}>
                                  {formatDate(item.date)}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <label htmlFor="date_end">Ngày đi</label>
                          <p className="form-control">
                            {formatDate(editOrder.date_end)}
                          </p>
                          {/* <select
                            id=""
                            className="form-control"
                            defaultValue={editOrder.date_end}
                            onChange={(e) => {
                              e.preventDefault();
                              setEditOrder({
                                ...editOrder,
                                date_end: e.target.value,
                              });
                            }}
                          >
                            {date.map((item) => {
                              return (
                                <option key={item._id} value={item.date}>
                                  {formatDate(item.date)}
                                </option>
                              );
                            })}
                          </select> */}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="service">Tên dịch vụ</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      defaultValue={editOrder.services?.name}
                    />
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="deliver">Đưa đón</label>
                    <select
                      className="form-control"
                      name="deliver"
                      id=""
                      defaultValue={editOrder.deliver}
                      onChange={(e) =>
                        setEditOrder({
                          ...editOrder,
                          deliver: e.target.value,
                        })
                      }
                    >
                      <option value="Tự đến">Tự đến</option>
                      <option value="Đón tại nhà">Đón tại nhà</option>
                    </select>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="weight">Cân nặng</label>
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      defaultValue={editOrder.weight}
                    />
                  </div>
                  {editOrder.hair ? (
                    <div className="col-lg-4 col-md-4">
                      <label htmlFor="hair">Cách nhuộm</label>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        defaultValue={editOrder.hair}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="price">Giá tiền</label>
                    <p className="form-control">{editOrder.price}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsShow((isShow) => !isShow);
                    reset();
                  }}
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {showDetail ? (
          <div class="b-modal">
            <div class="modal-content container">
              <div class="modal-header">
                <h4>Thông tin đặt dịch vụ</h4>
                <span
                  class="is-close"
                  onClick={() => {
                    setShowDetail((showDetail) => !showDetail);
                    reset();
                  }}
                >
                  &times;
                </span>
              </div>
              <div class="modal-body">
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="name">Tên khách hàng</label>
                    <p className="font-weight-bold">
                      {editOrder.customer?.name}
                    </p>
                  </div>

                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="time_come">Thời gian đến</label>
                    <p className="font-weight-bold">{editOrder.time_come}</p>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="date_come">Ngày đến</label>
                    <p className="font-weight-bold">
                      {formatDate(editOrder.date_come)}
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="date_end">Ngày đi</label>
                    <p className="font-weight-bold">
                      {formatDate(editOrder.date_end)}
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="service">Tên dịch vụ</label>
                    <p className="font-weight-bold">
                      {editOrder.services?.name}
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="deliver">Đưa đón</label>
                    <p className="font-weight-bold">{editOrder.deliver}</p>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="weight">Cân nặng</label>
                    <p className="font-weight-bold">{editOrder.weight}</p>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <label htmlFor="price">Giá tiền</label>
                    <p className="font-weight-bold">{editOrder.price}</p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => {
                    setShowDetail((showDetail) => !showDetail);
                    reset();
                  }}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default OrderInfo;
