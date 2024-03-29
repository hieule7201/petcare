import instance from "./config";

const getAllOrders = async () => {
  return await instance.get("/get-all-orders");
};
const groupByService = async () => {
  return await instance.get("group-by-service");
};
const groupByCustomer = async () => {
  return await instance.get("group-by-customer");
};
const getOrderById = async (id) => {
  return await instance.get(`/get-order-by-id/${id}`);
};
const dayPriceInMonth = async (dayStart, dayEnd) => {
  return await instance.get(`/day-price-in-month/${dayStart}/${dayEnd}`, {
    params: { dayStart: dayStart, dayEnd: dayEnd },
  });
};
const getOrderByCustomer = async (customer) => {
  return await instance.get(`/get-order-by-customer/${customer}`);
};
const editStatus = async (id, status) => {
  return await instance.put(`/edit-status/${id}`, status);
};
const updateOrder = async (
  id,
  { hair, time_come, date_come, date_end, deliver, price }
) => {
  return await instance.put(`/update-order/${id}`, {
    hair,
    time_come,
    date_come,
    date_end,
    deliver,
    price,
  });
};
const addOrder = async ({
  services,
  customer,
  status,
  hair,
  weight,
  time_come,
  date_come,
  date_end,
  deliver,
  price,
}) => {
  return await instance.post("/add-order", {
    services,
    customer,
    status,
    hair,
    weight,
    time_come,
    date_come,
    date_end,
    deliver,
    price,
  });
};
export {
  addOrder,
  getAllOrders,
  getOrderByCustomer,
  getOrderById,
  editStatus,
  updateOrder,
  groupByService,
  groupByCustomer,
  dayPriceInMonth,
};
