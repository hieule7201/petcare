import React, { useEffect, useRef, useState } from "react";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";
import { MdOutlinePayment } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";
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
import { getAllInvoices, updateInvoice } from "../../api/invoice";

const InvoiceManage = () => {
  useEffect(() => {
    getAll();
  }, []);
  const columns = [
    { id: "stt", name: "STT" },
    { id: "order", name: "Mã Đặt DV" },
    { id: "status", name: "Trạng thái" },
    { id: "name", name: "Tên khách hàng" },
    { id: "service", name: "Tên dịch vụ" },
    { id: "invoice_amount", name: "Tổng tiền" },
    { id: "discount", name: "Giảm giá" },
    { id: "time_charge", name: "Ngày thanh toán" },
    { id: "amount_charge", name: "Thanh toán" },
    { id: "action", name: "Thao tác" },
  ];
  const printRef = useRef();
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [invoice, setInvoice] = useState([]);
  const [editInvoice, setEditInvoice] = useState({});
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
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };
  console.log(discount, total);
  const payment = async () => {
    Swal.fire({
      title: "Bạn có chắc chắn ?",
      showCancelButton: true,
      confirmButtonText: "Đúng",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await updateInvoice(editInvoice._id, {
            discount,
            amount_charge: total,
          });
          getAll();
          setIsShow(false);
          setDiscount(0);
          Swal.fire({
            title: response.data.message,
            icon: "success",
            timer: 4000,
          });
        } catch (error) {
          Swal.fire({
            title: "Có lỗi xảy ra",
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
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .slice(page * rowPage, page * rowPage + rowPage)

                      .map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.order?._id}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.order?.customer?.name}</TableCell>
                            <TableCell>{item.order?.services?.name}</TableCell>
                            <TableCell>
                              {formatMoney(item.invoice_amount)}
                            </TableCell>
                            <TableCell>
                              {item.discount || item.discount === 0
                                ? formatMoney(item.discount)
                                : ""}
                            </TableCell>
                            <TableCell>
                              {item.time_charge
                                ? formatDate(item?.time_charge)
                                : ""}
                            </TableCell>
                            <TableCell>
                              {item?.amount_charge
                                ? formatMoney(item?.amount_charge)
                                : ""}
                            </TableCell>
                            <TableCell>
                              {item.status === "Chưa thanh toán" ? (
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setIsShow(true);
                                    setEditInvoice(item);
                                    setTotal(item.invoice_amount);
                                  }}
                                >
                                  <MdOutlinePayment />
                                </button>
                              ) : (
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    setIsDetail(true);
                                    setEditInvoice(item);
                                  }}
                                >
                                  <IoEyeSharp />
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
                    setDiscount(0);
                  }}
                >
                  &times;
                </span>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-2 col-md-2 my-3">
                    <label htmlFor="name">Tên khách hàng</label>
                    <p className="font-weight-bold">
                      {editInvoice.order?.customer?.name}
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-4 my-3">
                    <div className="row">
                      <div className="col-lg-8 col-md-8">
                        <label htmlFor="name">Tên Dịch vụ</label>
                        <p className="font-weight-bold">
                          {editInvoice.order?.services?.name}
                        </p>
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
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setDiscount(Number.parseInt(e.target.value));
                        if (e.target.value) {
                          setTotal(
                            editInvoice.invoice_amount -
                              Number.parseInt(e.target.value)
                          );
                        } else setTotal(editInvoice.invoice_amount);
                      }}
                    />
                  </div>
                  <div className="col-lg-3 col-md-3 my-3">
                    <label htmlFor="name">Tổng tiền</label>
                    <p className="font-weight-bold">{total}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsShow((isShow) => !isShow);
                    setDiscount(0);
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
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={payment}
                >
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
              <div ref={printRef} className="modal-body">
                <div className="text-center">
                  <label htmlFor="name">Tên khách hàng</label>
                  <p className="font-weight-bold">
                    {editInvoice.order?.customer?.name}
                  </p>
                </div>
                <div className="w-100 border-bottom"></div>
                <div className="row py-5">
                  <div className="col-lg-8 col-md-8">
                    <label htmlFor="name">Tên Dịch vụ</label>
                    <p className="font-weight-bold">
                      {editInvoice.order?.services?.name}
                    </p>
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
                    <p className="font-weight-bold">
                      {" "}
                      {discount ? formatMoney(discount) : formatMoney(0)}
                    </p>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <label htmlFor="name">Tổng tiền</label>
                    <p className="font-weight-bold"> {formatMoney(total)}</p>
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    handlePrint();
                    setIsPrint(false);
                  }}
                >
                  In
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {isDetail ? (
          <div className="b-modal">
            <div className="modal-content container">
              <div className="modal-header">
                <h4>Thông tin Hóa đơn</h4>
                <span
                  className="is-close"
                  onClick={() => {
                    setIsDetail((isDetail) => !isDetail);
                    setDiscount(0);
                  }}
                >
                  &times;
                </span>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-2 col-md-2 my-3">
                    <label htmlFor="name">Tên khách hàng</label>
                    <p className="font-weight-bold">
                      {editInvoice.order?.customer?.name}
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-4 my-3">
                    <div className="row">
                      <div className="col-lg-8 col-md-8">
                        <label htmlFor="name">Tên Dịch vụ</label>
                        <p className="font-weight-bold">
                          {editInvoice.order?.services?.name}
                        </p>
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
                    <p className="font-weight-bold">
                      {formatMoney(editInvoice.discount)}
                    </p>
                  </div>
                  <div className="col-lg-3 col-md-3 my-3">
                    <label htmlFor="name">Tổng tiền</label>
                    <p className="font-weight-bold">
                      {formatMoney(editInvoice.amount_charge)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsDetail((isDetail) => !isDetail);
                    setDiscount(0);
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

export default InvoiceManage;
