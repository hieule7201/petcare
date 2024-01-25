import React from "react";
import { useNavigate } from "react-router-dom";
import img_card_default from "../../assets/img/service_default.jpg";
import Navbar from "../../components/Navbar";
import "./service.css";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import Services from "../../components/Home/Services";
const Service = () => {
  const navigate = useNavigate();
  const service = useSelector((state) => state.service);
  return (
    <>
      <Navbar />
      <div className="service">
        <div className="box-header">
          <h2 className="service-header">Các dịch vụ</h2>
        </div>
        <Services />
      </div>
      <Footer />
    </>
  );
};

export default Service;
