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
import { getAllInvoices } from "../../api/invoice";
import { find_service_by_id } from "../../api/service";
import { getCusById } from "../../api/customer";

const InvoiceManage = () => {
  useEffect(() => {
    getAll();
  }, []);
  const columns = [
    { id: "stt", name: "STT" },
    { id: "order", name: "Mã Đặt DV" },
    { id: "status", name: "Trạng thái" },
    { id: "invoice_amount", name: "Tổng tiền" },
    { id: "discount", name: "Giảm giá" },
    { id: "time_charge", name: "Ngày thanh toán" },
    { id: "amount_charge", name: "Tiền nhận" },
    { id: "change", name: "Tiền thừa" },
    { id: "action", name: "Thao tác" },
  ];
  const [isShow, setIsShow] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [invoice, setInvoice] = useState([]);
  const [editInvoice, setEditInvoice] = useState({});
  const [customer, setCustomer] = useState({});
  const [service, setService] = useState({});
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
      const response = await getAllInvoices();
      setInvoice(response.data.data);
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        timer: 3000,
      });
    }
  };
  const getService = async (id) => {
    try {
      const response = await find_service_by_id(id);
      setService(response.data.data);
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        timer: 3000,
      });
    }
  };
  const getCustomer = async (id) => {
    try {
      const response = await getCusById(id);
      setCustomer(response.data.data);
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        timer: 3000,
      });
    }
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
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };
  return (
    <>
      <DashboardHeader />
      <div className="mx-5 shop_container">
        <DashboardSlide active={8} />
        <div className="d-flex flex-column w-100">
          <div className="w-100">
            <h2 className="text-center mb-3">Quản lý hóa đơn</h2>
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
                    {invoice
                      .slice(page * rowPage, page * rowPage + rowPage)
                      .map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.order?._id}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>
                              {formatMoney(item.invoice_amount)}
                            </TableCell>
                            <TableCell>{formatMoney(item?.discount)}</TableCell>
                            <TableCell>
                              {item.time_charge
                                ? formatDate(item?.time_charge)
                                : ""}
                            </TableCell>
                            <TableCell>
                              {formatMoney(item?.amount_charge)}
                            </TableCell>
                            <TableCell>{formatMoney(item?.change)}</TableCell>
                            <TableCell>
                              {item.status === "Chưa thanh toán" ? (
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setIsShow(true);
                                    setEditInvoice(item);
                                    getCustomer(item.order.customer);
                                    getService(item.order.services);
                                  }}
                                >
                                  Thanh toán
                                </button>
                              ) : (
                                <button className="btn btn-primary">
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
                count={invoice.length}
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
                <h4>Thông tin Hóa đơn</h4>
                <span
                  className="is-close"
                  onClick={() => {
                    setIsShow((isShow) => !isShow);
                  }}
                >
                  &times;
                </span>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-2 col-md-2 my-3">
                    <label htmlFor="name">Tên khách hàng</label>
                    <p className="font-weight-bold">{customer.name}</p>
                  </div>
                  <div className="col-lg-4 col-md-4 my-3">
                    <div className="row">
                      <div className="col-lg-8 col-md-8">
                        <label htmlFor="name">Tên Dịch vụ</label>
                        <p className="font-weight-bold">{service.name}</p>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <label htmlFor="name">Giá</label>
                        <p className="font-weight-bold">
                          {formatMoney(editInvoice.invoice_amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 my-3">
                    <label htmlFor="name">Giảm giá</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-lg-3 col-md-3 my-3">
                    <label htmlFor="name">Tổng tiền</label>
                    <p className="font-weight-bold"></p>
                  </div>
                  <div className="col-lg-3 col-md-3 my-3">
                    <label htmlFor="name">Tiền nhận</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-lg-3 col-md-3 my-3">
                    <label htmlFor="name">Tiền dư</label>
                    <p className="font-weight-bold">{editInvoice?.change}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsShow((isShow) => !isShow);
                  }}
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => setIsPrint(true)}
                >
                  Tạm in
                </button>
                <button type="submit" className="btn btn-success">
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {isPrint ? (
          <div className="print-modal">
            <div className="modal-content w-50">
              <div className="modal-header">
                <h3>In Hóa đơn</h3>
                <span
                  className="is-close"
                  onClick={() => {
                    setIsPrint((isShow) => !isShow);
                  }}
                >
                  &times;
                </span>
              </div>
              <div className="modal-body">
                <div className="text-center">
                  <label htmlFor="name">Tên khách hàng</label>
                  <p className="font-weight-bold">{customer.name}</p>
                </div>
                <div className="w-100 border-bottom"></div>
                <div className="row py-5">
                  <div className="col-lg-8 col-md-8">
                    <label htmlFor="name">Tên Dịch vụ</label>
                    <p className="font-weight-bold">{service.name}</p>
                  </div>
                  <div className="col-lg-4 col-md-4 d-flex flex-column align-items-end">
                    <label htmlFor="name">Giá</label>
                    <p className="font-weight-bold">
                      {formatMoney(editInvoice.invoice_amount)}
                    </p>
                  </div>
                </div>
                <div className="w-100 border-bottom"></div>
                <div className="d-flex flex-column align-items-end">
                  <div className="d-flex flex-column align-items-end ">
                    <label htmlFor="name">Giảm giá</label>
                    <p className="font-weight-bold"> %</p>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <label htmlFor="name">Tổng tiền</label>
                    <p className="font-weight-bold">
                      {" "}
                      {formatMoney(editInvoice.invoice_amount)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsPrint((isShow) => !isShow);
                  }}
                >
                  Đóng
                </button>
                <button type="submit" className="btn btn-primary">
                  In
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

export default InvoiceManage;
