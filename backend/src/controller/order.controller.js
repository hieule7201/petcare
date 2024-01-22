import orderService from "../service/order.service.js";
import httpStatus from "http-status-codes";

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(httpStatus.OK).json({
      message: "Successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};
const getOrderById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const order = await orderService.getOrderById(id);
    res.status(httpStatus.OK).json({
      message: "Successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
const getOrderByCustomer = async (req, res, next) => {
  const customer = req.params.customer;
  try {
    const order = await orderService.getOderByCustomer(customer);
    res.status(httpStatus.OK).json({
      message: "Successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
const editStatus = async (req, res, next) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const order = await orderService.editStatus(id, status);
    res.status(httpStatus.OK).json({
      message: "Successfully",
    });
  } catch (error) {
    next(error);
  }
};
const addOder = async (req, res, next) => {
  const {
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
  } = req.body;
  const [day, month, year] = date_come?.split("/");
  let newDate;
  if (date_end) {
    const [day1, month1, year1] = date_end?.split("/");
    newDate = new Date(year1, month1 - 1, day1);
  } else {
    newDate = new Date(year, month - 1, day);
  }

  try {
    const order = await orderService.addOder({
      services,
      customer,
      status,
      hair,
      weight,
      time_come,
      date_come: new Date(year, month - 1, day),
      date_end: newDate,
      deliver,
      price,
    });
    res.status(httpStatus.OK).json({
      message: "Successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
const updateOrder = async (req, res, next) => {
  const id = req.params.id;
  const { hair, weight, time_come, date_come, date_end, deliver, price } =
    req.body;
  const [day, month, year] = date_come?.split("/");
  let newDate;
  if (date_end) {
    const [day1, month1, year1] = date_end?.split("/");
    newDate = new Date(year1, month1 - 1, day1);
  } else {
    newDate = new Date(year, month - 1, day);
  }
  try {
    const order = await orderService.updateOrder(id, {
      hair,
      time_come,
      date_come: new Date(year, month - 1, day),
      date_end: newDate,
      deliver,
      price,
      status: "Đã xác nhận",
    });
    res.status(httpStatus.OK).json({
      message: "Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export default {
  getAllOrders,
  getOrderById,
  getOrderByCustomer,
  editStatus,
  addOder,
  updateOrder,
};
