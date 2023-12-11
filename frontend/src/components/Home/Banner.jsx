import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { banner_pet } from "../../data";
const Banner = () => {
  return (
    <div className="banner">
      <Swiper
        pagination={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="container banner-container"
      >
        {banner_pet.map(({ sub_title, title, desc, img }, index) => {
          return (
            <SwiperSlide className="banner-slides" key={index}>
              <div className="banner-left">
                <span className="banner-sub_title">{sub_title}</span>
                <h1 className="banner-title">{title}</h1>
                <p className="banner_desc">{desc}</p>
              </div>
              <div className="banner-right">
                <img src={img} alt="" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banner;