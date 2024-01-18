import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Swal from "sweetalert2";
import { getAllCus, updateCus } from "../../api/customer";

const CusInfo = () => {
  useEffect(() => {
    getAll();
  }, []);
  const columns = [
    { id: "stt", name: "STT" },
    { id: "id", name: "ID" },
    { id: "name", name: "Tên khách hàng" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Số điện thoại" },
    { id: "address", name: "Địa chỉ" },
    { id: "count", name: "Lần sử dụng" },
    { id: "action", name: "Thao tác" },
  ];
  const [cus, setCus] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [editCus, setEditCus] = useState({});
  const [phone, setPhone] = useState("");
  const [page, pageChange] = useState(0);
  const [rowPage, rowPageChange] = useState(5);
  const handlePageChange = (event, newPage) => {
    pageChange(newPage);
  };
  const handleRowPerPage = (event) => {
    rowPageChange(+event.target.value);
    pageChange(0);
  };
  const getAll = async () => {
    try {
      const response = await getAllCus();
      setCus(response.data.data);
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        timer: 3000,
      });
    }
  };
  const handleEdit = async () => {
    try {
      const response = await updateCus(editCus._id, {
        address: editCus.address,
        email: editCus.email,
        name: editCus.name,
        phone: editCus.phone,
      });
      setIsShow(false);
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
  };
  console.log(editCus);
  return (
    <>
      <DashboardHeader />
      <div className="mx-5 shop_container">
        <DashboardSlide active={4} />
        <div className="d-flex flex-column w-100">
          <div className="w-100">
            <h2 className="text-center mb-3">Quản lý Khách hàng</h2>
            <div className="form-input d-flex justify-content-end mb-3">
              <input
                type="search"
                placeholder="Nhập số điện thoại"
                className="form-control  w-25 "
                onChange={(event) => setPhone(event.target.value)}
              />
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
                    {cus
                      .slice(page * rowPage, page * rowPage + rowPage)
                      .filter((item) => item.phone.indexOf(phone) !== -1)
                      .map((item, index) => {
                        return (
                          <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item._id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.address}</TableCell>
                            <TableCell>{item.count}</TableCell>

                            <TableCell>
                              <button
                                className="btn btn-warning"
                                onClick={() => {
                                  setIsShow(true);
                                  setEditCus(item);
                                }}
                              >
                                Chỉnh sửa
                              </button>
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
                count={cus.length}
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
          <div class="b-modal">
            <div class="modal-content w-50">
              <div class="modal-header">
                <h2>Chỉnh sửa Khách hàng</h2>
                <span
                  class="is-close"
                  onClick={() => setIsShow((isShow) => !isShow)}
                >
                  &times;
                </span>
              </div>
              <div class="modal-body px-5">
                <div className="form-input d-flex flex-column justify-content-center mb-3">
                  <label htmlFor="name">Tên khách hàng</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nhập Tên khách hàng"
                    className="form-control  w-100 "
                    defaultValue={editCus.name}
                    required={true}
                    onChange={(event) => {
                      setEditCus({ ...editCus, name: event.target.value });
                    }}
                  />
                </div>
                <div className="form-input d-flex flex-column justify-content-center mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Nhập email"
                    className="form-control  w-100 "
                    defaultValue={editCus.email}
                    onChange={(event) => {
                      setEditCus({ ...editCus, email: event.target.value });
                    }}
                  />
                </div>
                <div className="form-input d-flex flex-column justify-content-center mb-3">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    className="form-control  w-100 "
                    defaultValue={editCus.phone}
                    onChange={(event) => {
                      setEditCus({ ...editCus, phone: event.target.value });
                    }}
                  />
                </div>
                <div className="form-input d-flex flex-column w-100 justify-content-center mb-3 ">
                  <label htmlFor="address">Địa chỉ</label>
                  <input
                    name="address"
                    type="text"
                    placeholder="Nhập địa chỉ"
                    className="form-control  w-100 "
                    defaultValue={editCus.address}
                    onChange={(event) => {
                      setEditCus({ ...editCus, address: event.target.value });
                    }}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => setIsShow((isShow) => !isShow)}
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={handleEdit}
                >
                  Xác nhận
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

export default CusInfo;
