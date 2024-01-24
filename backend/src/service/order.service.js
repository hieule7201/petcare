import orderModel from "../model/order.model.js";
import customerService from "./customer.service.js";

const getAllOrders = async () => {
  return await orderModel.find().populate("services").populate("customer");
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
  return await orderModel.create({
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
const editStatus = async (id, status) => {
  const getCus = await orderModel.findById(id);
  if (getCus && status === "Đã hủy") {
    await customerService.minusCount(getCus.customer);
  }
  return await orderModel.findByIdAndUpdate(id, { status: status });
};
const updateOrder = async (
  id,
  { hair, weight, time_come, date_come, date_end, deliver, price, status }
) => {
  return await orderModel.findByIdAndUpdate(id, {
    hair,
    time_come,
    date_come,
    date_end,
    deliver,
    price,
    status,
  });
};
const groupByService = async () => {
  return await orderModel.aggregate([
    { $match: { status: "Đã hoàn thành" } },
    { $group: { _id: "$services", price: { $sum: "$price" } } },
    { $project: { _id: { $toObjectId: "$_id" }, price: "$price" } },
    {
      $lookup: {
        from: "services",
        localField: "_id",
        foreignField: "_id",
        as: "service",
        pipeline: [{ $project: { name: "$name" } }],
      },
    },
  ]);
};
const groupByCustomer = async () => {
  return await orderModel.aggregate([
    { $match: { status: "Đã hoàn thành" } },
    { $group: { _id: "$customer", price: { $sum: "$price" } } },
    { $project: { _id: { $toObjectId: "$_id" }, price: "$price" } },
    {
      $lookup: {
        from: "customers",
        localField: "_id",
        foreignField: "_id",
        as: "cus",
        pipeline: [{ $project: { name: "$name" } }],
      },
    },
    { $sort: { price: -1 } },
    { $limit: 5 },
  ]);
};
const dayPriceInMonth = async (dayStart, dayEnd) => {
  return await orderModel.aggregate([
    {
      $match: {
        status: "Đã hoàn thành",
        date_come: {
          $gte: new Date(dayStart),
          $lte: new Date(dayEnd),
        },
      },
    },
    { $group: { _id: "$date_come", price: { $sum: "$price" } } },
  ]);
};

export default {
  addOder,
  updateOrder,
  editStatus,
  getAllOrders,
  getOderByCustomer,
  getOrderById,
  groupByService,
  groupByCustomer,
  dayPriceInMonth,
};
