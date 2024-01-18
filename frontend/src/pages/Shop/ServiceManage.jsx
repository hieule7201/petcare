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
import { get_all_service } from "../../api/service";

const ServiceManage = () => {
  const columns = [
    { id: "stt", name: "STT" },
    { id: "id", name: "ID" },
    { id: "name", name: "Tên dịch vụ" },
    { id: "img", name: "Hình ảnh" },
    { id: "des", name: "Chi tiết" },
    { id: "action", name: "Thao tác" },
  ];
  const [name, setName] = useState("");
  const [service, setService] = useState([]);
  const [page, pageChange] = useState(0);
  const [rowPage, rowPageChange] = useState(5);
  useEffect(() => {
    getAll();
  }, []);
  const handlePageChange = (event, newPage) => {
    pageChange(newPage);
  };
  const handleRowPerPage = (event) => {
    rowPageChange(+event.target.value);
    pageChange(0);
  };
  const getAll = async () => {
    try {
      const service = await get_all_service();
      setService(service.data.data);
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        timer: 3000,
      });
    }
  };
  return (
    <>
      <DashboardHeader />
      <div className="mx-5 shop_container">
        <DashboardSlide active={7} />
        <div className="d-flex flex-column w-100">
          <div className="w-100">
            <h2 className="text-center mb-3">Quản lý Dịch vụ</h2>
            <div className="form-input d-flex justify-content-end mb-3">
              <input
                type="search"
                placeholder="Nhập tên dịch vụ"
                className="form-control  w-25 "
                onChange={(event) => setName(event.target.value)}
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
                    {service
                      .slice(page * rowPage, page * rowPage + rowPage)
                      .filter(
                        (item) =>
                          item.name
                            .toLowerCase()
                            .indexOf(name.toLowerCase()) !== -1
                      )
                      .map((item, index) => {
                        return (
                          <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item._id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                              <img
                                src={item.img}
                                alt=""
                                style={{ maxWidth: "8rem" }}
                              />
                            </TableCell>
                            <TableCell className="textContainer">
                              {item.des.length > 30
                                ? item.des.slice(0, 30) + "..."
                                : item.des}
                            </TableCell>

                            <TableCell>
                              <button className="btn btn-warning">
                                Chỉnh sửa
                              </button>
                              <button className="btn btn-danger ml-3">
                                Xoá
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
                count={service.length}
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

export default ServiceManage;
