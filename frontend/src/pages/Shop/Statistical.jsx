import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";
import { MdGroups, MdOutlinePets } from "react-icons/md";
import { FaUserEdit, FaFileInvoice } from "react-icons/fa";
import Swal from "sweetalert2";
import { getAllCus } from "../../api/customer";
import { get_all_service } from "../../api/service";
import {
  dayPriceInMonth,
  getAllOrders,
  groupByCustomer,
  groupByService,
} from "../../api/order";
import { getAllInvoices } from "../../api/invoice";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";

const Statistical = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const option = {
    plugins: {
      title: {
        display: true,
        text: "Tổng thu của từng dịch vụ",
        font: {
          size: 24,
        },
      },
    },
  };
  const optionPie = {
    plugins: {
      title: {
        display: true,
        text: "Top 5 khách hàng có mức tiêu dùng cao nhất",
        font: {
          size: 24,
        },
      },
    },
  };
  const optionLine = {
    plugins: {
      title: {
        display: true,
        text: "Thống kê những ngày có doanh thu",
        font: {
          size: 24,
        },
      },
    },
  };
  useEffect(() => {
    getData();
  }, []);
  const [isShow, setIsShow] = useState(false);
  const [dayStart, setDayStart] = useState("");
  const [customer, setCustomer] = useState([]);
  const [service, setService] = useState([]);
  const [order, setOrder] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [lineData, setLineData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [dataMonth, setDataMonth] = useState(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const getDate = async (dayStart, dayEnd) => {
    try {
      const response6 = await dayPriceInMonth(dayStart, dayEnd);
      if (response6.data.data.length > 0) {
        setDataMonth({
          labels: response6.data.data.map((item) => formatDate(item._id)),
          datasets: [
            {
              label: "Tổng tiền",

              data: response6.data.data.map((item) => item.price),
              hoverOffset: 4,
            },
          ],
        });
      } else {
        setIsShow(false);
        Swal.fire({
          title: "Không có dữ liệu",
          icon: "error",
          timer: 4000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        timer: 4000,
      });
    }
  };
  const getData = async () => {
    try {
      const response = await getAllCus();
      const response1 = await get_all_service();
      const response2 = await getAllOrders();
      const response3 = await getAllInvoices();
      const response4 = await groupByService();
      const response5 = await groupByCustomer();

      setCustomer(response.data.data);
      setService(response1.data.data);
      setOrder(response2.data.data);
      setInvoice(response3.data.data);

      if (response4.data.data.length > 0) {
        setLineData({
          labels: response4.data.data.map((item) => item.service[0].name),
          datasets: [
            {
              label: "Tổng tiền",
              data: response4.data.data.map((item) => item.price),
            },
          ],
        });
      }
      if (response5.data.data.length > 0) {
        setPieData({
          labels: response5.data.data.map((item) => item.cus[0].name),
          datasets: [
            {
              label: "Tổng tiền",

              data: response5.data.data.map((item) => item.price),
              hoverOffset: 6,
            },
          ],
        });
      }
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        timer: 4000,
      });
    }
  };

  return (
    <>
      <DashboardHeader />
      <div className="mx-5 shop_container">
        <DashboardSlide active={9} />
        <div className="d-flex flex-column w-100 mx-3">
          <div className="row">
            <div className="col-lg-3">
              <div className="card bg-danger border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-title font-weight-bold text-white mb-0">
                      Khách hàng
                    </p>
                    <MdGroups
                      className="text-white"
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <h5 className="font-weight-bold text-white mb-0 mt-3">
                      {customer.length}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card bg-info border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-title font-weight-bold text-white mb-0">
                      Đăng ký
                    </p>
                    <FaUserEdit
                      className="text-white"
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <h5 className="font-weight-bold text-white mb-0 mt-3">
                      {order.length}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card bg-warning border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-title font-weight-bold text-white mb-0">
                      Dịch vụ
                    </p>
                    <MdOutlinePets
                      className="text-white"
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <h5 className="font-weight-bold text-white mb-0 mt-3">
                      {service.length}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card bg-success border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-title font-weight-bold text-white mb-0">
                      Hóa đơn
                    </p>
                    <FaFileInvoice
                      className="text-white"
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <h5 className="font-weight-bold text-white mb-0 mt-3">
                      {invoice.length}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-7">
              {lineData !== null ? (
                <Bar options={option} data={lineData} />
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-5">
              {lineData !== null ? (
                <Pie options={optionPie} data={pieData} />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="my-5">
            <div className="d-flex justify-content-end">
              <input
                type="date"
                className="form-control w-25"
                onChange={(e) => {
                  setDayStart(e.target.value);
                }}
              />
              <input
                type="date"
                className="form-control w-25 ml-2"
                onChange={(e) => {
                  getDate(dayStart, e.target.value);
                  setIsShow(true);
                }}
              />
            </div>
            {isShow ? <Line data={dataMonth} options={optionLine} /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistical;
