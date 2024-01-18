import instance from "./config";

const getAllOrders = async () => {
  return await instance.get("/get-all-orders");
};
const getOrderById = async (id) => {
  return await instance.get(`/get-order-by-id/${id}`);
};
const getOrderByCustomer = async (customer) => {
  return await instance.get(`/get-order-by-customer/${customer}`);
};
const editStatus = async (id, status) => {
  return await instance.put(`/edit-status/${id}`, status);
};
const updateOrder = async (
  id,
  { hair, weight, time_come, date_come, date_end, deliver }
) => {
  return await instance.put(`/update-order/${id}`, {
    hair,
    weight,
    time_come,
    date_come,
    date_end,
    deliver,
  });
};
const addOrder = async ({
  service,
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
    service,
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
};
