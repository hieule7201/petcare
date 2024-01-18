import React, { useState } from "react";
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

const OrderInfo = () => {
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
  const [page, pageChange] = useState(0);
  const [rowPage, rowPageChange] = useState(5);
  const handlePageChange = (event, newPage) => {
    pageChange(newPage);
  };
  const handleRowPerPage = (event) => {
    rowPageChange(+event.target.value);
    pageChange(0);
  };
  return (
    <>
      <DashboardHeader />
      <div className="mx-5 shop_container">
        <DashboardSlide active={2} />
        <div className="d-flex flex-column w-100">
          <div className="w-100">
            <h2 className="text-center mb-3">Quản lý đặt dịch vụ</h2>
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
                  <TableBody></TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                sx={{ marginBottom: 0 }}
                rowsPerPageOptions={[5, 10, 15]}
                page={page}
                rowsPerPage={rowPage}
                component="div"
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
