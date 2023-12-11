import React from "react";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";
import Table from "../../UI/Table";

const CusOrder = () => {
  return (
    <>
      <DashboardHeader />
      <div className="container shop_container">
        <DashboardSlide active={3} />
        <Table />
      </div>
    </>
  );
};

export default CusOrder;
