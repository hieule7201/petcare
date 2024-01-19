import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";
import { getAllOrders, editStatus } from "../../api/order.js";

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
  }, []);
  const [order, setOrder] = useState([]);
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
  const handleReset = () => {
    setSearchName("");
    setSearchStatus("");
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
                <InputLabel id="demo-simple-select-label">Dịch vụ</InputLabel>
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
                                    onClick={() => {
                                      setStatus(item._id, "Đã xác nhận");
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
                                  <button className="btn btn-success">✔</button>
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
                                <button className="btn btn-secondary">
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
      </div>
    </>
  );
};

export default OrderInfo;
