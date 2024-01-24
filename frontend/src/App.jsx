import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { get_user } from "./api/user";
import { loginStart, loginSuccess } from "../src/redux/authSlice";
import { useDispatch } from "react-redux";
import ServiceDetail from "./pages/ServiceDetail/ServiceDetail";
import ShopHome from "./pages/Shop/ShopHome";
import OrderDetail from "./pages/Shop/OrderDetail";
import OrderInfo from "./pages/Shop/OrderInfo";
import CusInfo from "./pages/Shop/CusInfo";
import StaffSetting from "./pages/Shop/StaffSetting";
import Service from "./pages/service/Service";
import About from "./pages/About/About";
import { getAllService } from "./redux/actions/service";
import CreateDate from "./pages/Shop/CreateDate";
import DateTimeManage from "./pages/Shop/DateTimeManage";
import ServiceManage from "./pages/Shop/ServiceManage";
import InvoiceManage from "./pages/Shop/InvoiceManage";
import Statistical from "./pages/Shop/Statistical";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // loadUser();
    dispatch(getAllService());
  });
  const loadUser = async () => {
    try {
      dispatch(loginStart());
      const res = await get_user();
      dispatch(loginSuccess(res.data));
      // console.log(res.data);
    } catch (error) {
      // dispatch(loginFail());
      console.log(error.response?.data.message);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<About />} />

        {/* SHOP */}
        <Route path="/shop" element={<ShopHome />} />
        <Route path="/shop/order_info" element={<OrderInfo />} />
        <Route path="/shop/cus_info" element={<CusInfo />} />
        <Route path="/shop/create_date" element={<CreateDate />} />
        <Route path="/shop/date_time" element={<DateTimeManage />} />
        <Route path="/shop/service_manage" element={<ServiceManage />} />
        <Route path="/shop/invoice_manage" element={<InvoiceManage />} />
        <Route path="/shop/statistical" element={<Statistical />} />

        <Route path="/shop/staff_setting" element={<StaffSetting />} />

        <Route path="/shop/:id" element={<OrderDetail />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
