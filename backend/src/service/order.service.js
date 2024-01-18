import orderModel from "../model/order.model.js";

const getAllOrders = async () => {
  return await orderModel
    .find()
    .populate("services", "name")
    .populate("customer");
};
const getOrderById = async (id) => {
  return await orderModel
    .findById(id)
    .populate("services", "name")
    .populate("customer");
};
const getOderByCustomer = async (customer) => {
  return await orderModel
    .find({ customer: customer })
    .populate("services", "name")
    .populate("customer");
};
const addOder = async ({
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
  return await orderModel.create({
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
const editStatus = async (id, status) => {
  return await orderModel.findByIdAndUpdate(id, { status: status });
};
const updateOrder = async (
  id,
  { hair, weight, time_come, date_come, date_end, deliver }
) => {
  return await orderModel.findByIdAndUpdate(id, {
    hair,
    weight,
    time_come,
    date_come,
    date_end,
    deliver,
  });
};

export default {
  addOder,
  updateOrder,
  editStatus,
  getAllOrders,
  getOderByCustomer,
  getOrderById,
};
