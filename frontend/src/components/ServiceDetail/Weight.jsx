import React from "react";

const Weight = ({ prices, setData, data }) => {
  const setPrice = (item) => {
    if (data.date_end) {
      const [day, month, year] = data?.date_come?.split("/");
      const date1 = new Date(year, month - 1, day);
      const [day1, month1, year1] = data?.date_end?.split("/");
      const date2 = new Date(year1, month1 - 1, day1);
      const totalDate = (date2 - date1) / (1000 * 60 * 60 * 24);
      console.log((date2 - date1) / (1000 * 60 * 60 * 24));
      setData({ ...data, weight: item.value, price: totalDate * item.price });
    } else {
      setData({ ...data, weight: item.value, price: item.price });
    }
  };
  return (
    <div className="choose-box">
      {prices.map((item) => {
        return (
          <div className="box-input" key={item.value}>
            <input
              className="radio-custom"
              type="radio"
              name="weight"
              id={item.value}
              onChange={() => {
                setPrice(item);
              }}
            />
            <label htmlFor={item.value} className="label">
              {item.value}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Weight;
