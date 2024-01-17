import customerService from "../service/customer.service.js";
import HttpStatus from "http-status-codes";

const getAllCustomer = async (req, res, next) => {
  try {
    const data = await customerService.getAllCustomer();
    res.status(HttpStatus.OK).json({
      message: "Successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const getCusByPhone = async (req, res, next) => {
  const phone = req.params.phone;
  try {
    const data = await customerService.getCusByPhone(phone);
    res.status(HttpStatus.OK).json({
      message: "Successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const getCusById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await customerService.getCusById(id);
    res.status(HttpStatus.OK).json({
      message: "Successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const addCount = async (req, res, next) => {
  const phone = req.params.phone;
  try {
    const data = await customerService.addCount(phone);
    res.status(HttpStatus.OK).json({
      message: "Successfully",
    });
  } catch (error) {
    next(error);
  }
};
const addCustomer = async (req, res, next) => {
  const { phone, email, name, address } = req.body;
  try {
    const data = await customerService.addCustomer({
      phone,
      email,
      name,
      address,
    });
    res.status(HttpStatus.OK).json({
      message: "Successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const updateCustomer = async (req, res, next) => {
  const id = req.params.id;
  const { phone, email, name, address } = req.body;
  try {
    const data = await customerService.updateCustomer(id, {
      phone,
      email,
      name,
      address,
    });
    res.status(HttpStatus.OK).json({
      message: "Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export default {
  addCount,
  addCustomer,
  getAllCustomer,
  getCusById,
  getCusByPhone,
  updateCustomer,
};
