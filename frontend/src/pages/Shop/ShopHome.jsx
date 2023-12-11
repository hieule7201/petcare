import React from "react";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";
import Order from "../../components/Shop/Order";
import "./shop.css";

const ShopHome = () => {
  return (
    <>
      <DashboardHeader />
      <div className="container shop_container">
        <DashboardSlide active={1} />
        <Order />
      </div>
    </>
  );
};

export default ShopHome;
