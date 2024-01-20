import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { banner_pet } from "../../data";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="banner mt-5">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="m-container banner-container"
      >
        {banner_pet.map(({ title, desc, img }, index) => {
          return (
            <SwiperSlide
              className="card border-0"
              style={{ maxHeight: "30rem" }}
              key={index}
            >
              <img src={img} alt="" className="card-img" />
              <div className="card-img-overlay d-flex flex-column align-items-start justify-content-center pl-5">
                <h1 className="card-title">{title}</h1>
                <h5 className="card-text">{desc}</h5>
                <Link to="/service" className="btn btn-success">
                  Đặt ngay
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banner;
