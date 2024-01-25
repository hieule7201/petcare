import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";
import { MdEditSquare } from "react-icons/md";
import { FaRegTrashAlt, FaPlusCircle } from "react-icons/fa";
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
import {
  add_service,
  delete_service,
  get_all_service,
  update_service,
} from "../../api/service";
import { toast } from "react-toastify";
import { URL_IMG } from "../../api/config";

const ServiceManage = () => {
  const columns = [
    { id: "stt", name: "STT" },
    { id: "id", name: "ID" },
    { id: "name", name: "Tên dịch vụ" },
    { id: "img", name: "Hình ảnh" },
    { id: "des", name: "Chi tiết" },
    { id: "action", name: "Thao tác" },
  ];
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [editSer, setEditSer] = useState({});
  const [kg5, setKg5] = useState({});
  const [kg10, setKg10] = useState({});
  const [kg20, setKg20] = useState({});
  const [kg40, setKg40] = useState({});

  const [isShow, setIsShow] = useState(false);
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
  const setOnlyWeight = (weight) => {
    setKg5(weight[0]);
    setKg10(weight[1]);
    setKg20(weight[2]);

    setKg40(weight[3]);
  };
  const onChangeImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]);
    }
  };
  const convertJson = (data) => {
    return JSON.stringify(data);
  };
  const handleSubmit = async () => {
    const newForm = new FormData();
    newForm.append("file", file);
    newForm.append("name", editSer.name);
    newForm.append("des", editSer.des);
    newForm.append("weights", convertJson([kg5, kg10, kg20, kg40]));
    for (const value of newForm.values()) {
      console.log(value);
    }

    if (!editSer._id) {
      try {
        const response = await add_service(newForm);
        setIsShow(false);
        getAll();
        reset();
        Swal.fire({
          timer: 4000,
          title: response.data.message,
          icon: "success",
        });
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const response = await update_service(editSer._id, newForm);
        setIsShow(false);
        getAll();
        reset();
        Swal.fire({
          timer: 4000,
          title: response.data.message,
          icon: "success",
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn ?",
      showCancelButton: true,
      confirmButtonText: "Đúng",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await delete_service(id);
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
  const reset = () => {
    setImg(null);
    setEditSer({});
    setKg5({});
    setKg10({});
    setKg20({});
    setKg40({});
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
              <button
                className="btn btn-success ml-3"
                style={{ background: "var(--color-primary)" }}
                onClick={() => setIsShow(true)}
              >
                <FaPlusCircle />
              </button>
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
                                src={URL_IMG + item.img}
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
                              <button
                                className="btn btn-warning"
                                onClick={() => {
                                  setIsShow(true);
                                  setEditSer(item);
                                  setImg(URL_IMG + item.img);
                                  setOnlyWeight(item.weights);
                                  setFile(item.img);
                                }}
                              >
                                <MdEditSquare />
                              </button>
                              <button
                                className="btn btn-danger ml-3"
                                onClick={() => handleDelete(item._id)}
                              >
                                <FaRegTrashAlt />
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
        {isShow ? (
          <div class="b-modal">
            <div class="modal-content w-50">
              <div class="modal-header">
                <h2>Dịch vụ</h2>
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
              <div class="modal-body px-5">
                <div className="form-input d-flex flex-column justify-content-center mb-3">
                  <label htmlFor="name">Tên Dịch vụ</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nhập Tên dịch vụ"
                    className="form-control  w-100 "
                    onChange={(e) => {
                      setEditSer({ ...editSer, name: e.target.value });
                    }}
                    defaultValue={editSer.name}
                  />
                </div>
                <div className="form-input d-flex flex-column justify-content-center mb-3">
                  <label htmlFor="des">Giới thiệu</label>
                  <textarea
                    type="text"
                    name="des"
                    placeholder="Nhập Giới thiệu"
                    className="form-control  w-100 "
                    defaultValue={editSer.des}
                    onChange={(e) => {
                      setEditSer({ ...editSer, des: e.target.value });
                    }}
                  />
                </div>
                <div className="form-input d-flex flex-column justify-content-center mb-3">
                  <label htmlFor="img">Chọn ảnh</label>
                  <input
                    type="file"
                    accept="images/**"
                    name="img"
                    className="form-control  w-100 mb-3"
                    onChange={onChangeImage}
                  />
                  <img src={img} alt="" style={{ maxWidth: "10rem" }} />
                </div>
                <div>
                  <p>Cân nặng</p>
                  <div className="row d-flex">
                    <div className="d-flex flex-column col-lg-3 col-md-3">
                      <label htmlFor="5kg">Dưới 5kg</label>
                      <input
                        className="form-control"
                        type="number"
                        name="5kg"
                        defaultValue={kg5?.price}
                        onChange={(e) => {
                          setKg5({ value: "Dưới 5 kg", price: e.target.value });
                        }}
                      />
                    </div>
                    <div className="d-flex flex-column col-lg-3 col-md-3">
                      <label htmlFor="10kg">5kg-10kg</label>
                      <input
                        className="form-control"
                        type="number"
                        name="10kg"
                        defaultValue={kg10?.price}
                        onChange={(e) => {
                          setKg10({ value: "5kg-10kg", price: e.target.value });
                        }}
                      />
                    </div>
                    <div className="d-flex flex-column col-lg-3 col-md-3">
                      <label htmlFor="10kg-20kg">10kg-20kg</label>
                      <input
                        className="form-control"
                        type="number"
                        name="10kg-20kg"
                        defaultValue={kg20?.price}
                        onChange={(e) => {
                          setKg20({
                            value: "10kg-20kg",
                            price: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="d-flex flex-column col-lg-3 col-md-3">
                      <label htmlFor="Trên 20kg">Trên 20kg</label>
                      <input
                        className="form-control"
                        type="number"
                        name="Trên 20kg"
                        defaultValue={kg40?.price}
                        onChange={(e) => {
                          setKg40({
                            value: "Trên 20kg",
                            price: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => {
                    setIsShow((isShow) => !isShow);
                    reset();
                  }}
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
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
      </div>
    </>
  );
};

export default ServiceManage;
