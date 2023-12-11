import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
import CusOrder from "./pages/Shop/CusOrder";
import CusInfo from "./pages/Shop/CusInfo";
import StaffSetting from "./pages/Shop/StaffSetting";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    loadUser();
  }, []);
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

        {/* SHOP */}
        <Route path="/shop" element={<ShopHome />} />
        <Route path="/order_info" element={<OrderInfo />} />
        <Route path="/cus_order" element={<CusOrder />} />
        <Route path="/cus_info" element={<CusInfo />} />
        <Route path="/staff_setting" element={<StaffSetting />} />

        <Route path="/shop/:id" element={<OrderDetail />} />
      </Routes>
      <Footer />
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
