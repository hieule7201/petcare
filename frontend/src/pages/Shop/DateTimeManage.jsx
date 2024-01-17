import { useEffect, useState } from "react";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";

import { get_all_service } from "../../api/service";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  deleteDate,
  findAllTime,
  findDateByService,
  updateDate,
} from "../../api/datetime";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { viVN } from "@mui/x-date-pickers/locales";
import Swal from "sweetalert2";

const DateTimeManage = () => {
  //Show data
  const [page, pageChange] = useState(0);
  const [rowPage, rowPageChange] = useState(5);

  const [data, setData] = useState([]);
  const [time, setTime] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [service, setService] = useState([]);
  const [idService, setIdService] = useState("658bebbfcc5968df9f286012");
  const [date, setDate] = useState({});
  const [reDate, setReDate] = useState("");
  const [id, setId] = useState("");

  var idDate = [];
  useEffect(() => {
    getService();
    getTime();
    getDate(idService);
  }, [idService]);
  const getService = async () => {
    try {
      const response = await get_all_service();
      setService(response.data.data);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  const getDate = async (services) => {
    try {
      const response = await findDateByService(services);
      setData(response.data.data);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  const getTime = async () => {
    try {
      const response = await findAllTime();
      setTime(response.data.data);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const handleCheck = (e) => {
    let isChecked = e.target.checked;
    console.log(isChecked);
    if (isChecked) setDate((date) => [...date, e.target.value]);
    else setDate(date.filter((a) => a !== e.target.value));
  };
  const getIdTime = (times) => {
    times.forEach((item) => {
      idDate.push(item._id);
    });
    setDate(idDate);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };
  const defaultCheck = (id) => {
    if (date.includes(id)) return true;
    else return false;
  };
  const handleClickSubmit = async () => {
    try {
      const response = await updateDate(id, {
        date: formatDate(reDate),
        times: date,
      });
      setIsShow(false);
      getDate(idService);
      Swal.fire({
        icon: "success",
        title: response.data.message,
        timer: 4000,
      });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn ?",
      showCancelButton: true,
      confirmButtonText: "Đúng",
      cancelButtonText: "Không",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const response = await deleteDate(id);
          getDate(idService);
          Swal.fire(response.data.message, "", "success");
        } catch (error) {
          toast.error(error.response?.data.message);
        }
      }
    });
  };
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
        <DashboardSlide active={5} />
        <div className="d-flex flex-column w-100">
          <div className="w-100">
            <h2 className="text-center mb-3">Quản lý ngày giờ</h2>
            <div className="w-100 d-flex justify-content-end m-3">
              <FormControl sx={{ m: 1, minWidth: 400 }}>
                <InputLabel id="demo-simple-select-label">Dịch vụ</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idService}
                  label="Dịch vụ"
                  onChange={(e) => {
                    setIdService(e.target.value);
                    getDate(e.target.value);
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
            </div>
          </div>
          <Paper sx={{ width: "100%", marginLeft: "1.25rem" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "var(--color-primary)" }}>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: 500,
                        textAlign: "center",
                        fontSize: "1rem",
                      }}
                      scope="col"
                    >
                      ID
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: 500,
                        textAlign: "center",
                        fontSize: "1rem",
                      }}
                      scope="col"
                    >
                      Tên dịch vụ
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: 500,
                        textAlign: "center",
                        fontSize: "1rem",
                      }}
                      scope="col"
                    >
                      Ngày phục vụ
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: 500,
                        textAlign: "center",
                        fontSize: "1rem",
                      }}
                      scope="col"
                    >
                      Tổng thời gian
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: 500,
                        textAlign: "center",
                        fontSize: "1rem",
                      }}
                      scope="col"
                    >
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowPage, page * rowPage + rowPage)
                    .map((item) => {
                      return (
                        <TableRow>
                          <TableCell>{item._id}</TableCell>
                          <TableCell>{item.services.name}</TableCell>
                          <TableCell>{formatDate(item.date)}</TableCell>
                          <TableCell>{item.times.length}</TableCell>
                          <TableCell>
                            <button
                              className="btn btn-warning"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsShow(true);
                                setReDate(item.date);
                                setId(item._id);
                                getIdTime(item.times);
                              }}
                            >
                              Chỉnh sửa
                            </button>
                            <button
                              className="btn btn-danger ml-3"
                              onClick={() => handleDelete(item._id)}
                            >
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
              count={data.length}
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
        {isShow ? (
          <div class="b-modal">
            <div class="modal-content container">
              <div class="modal-header">
                <h2>Chỉnh sửa ngày giờ</h2>
                <span
                  class="is-close"
                  onClick={() => setIsShow((isShow) => !isShow)}
                >
                  &times;
                </span>
              </div>
              <div class="modal-body">
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
                      format="DD/MM/YYYY"
                      defaultValue={dayjs(reDate)}
                      onChange={(value) => {
                        setReDate(formatDate(value));
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="choose-box" style={{ marginTop: "1rem" }}>
                  {time.map((props) => {
                    return (
                      <div key={props._id} className="box-input">
                        <input
                          disabled={props.total <= 0 ? true : false}
                          defaultChecked={defaultCheck(props._id)}
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
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => setIsShow((isShow) => !isShow)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={handleClickSubmit}
                >
                  Submit
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

export default DateTimeManage;
