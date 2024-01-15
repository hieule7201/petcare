import React from "react";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";

const StaffSetting = () => {
  return (
    <>
      <DashboardHeader />
      <div className="container shop_container">
        <DashboardSlide />
      </div>
    </>
  );
};

export default StaffSetting;
