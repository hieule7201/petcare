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
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
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
