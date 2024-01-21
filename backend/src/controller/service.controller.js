import serviceService from "../service/service.service.js";
import HttpStatus from "http-status-codes";
import path from "path";

const add_service = async (req, res, next) => {
  const { name, des, weights, hairs } = req.body;
  const fileName = req.file.filename;
  const fileUrl = path.join(fileName);
  try {
    const service = await serviceService.add_service({
      name,
      img: fileUrl,
      des,
      weights: JSON.parse(weights),
      hairs,
    });
    res.status(HttpStatus.OK).json({
      message: "register successfully",
      data: "",
    });
  } catch (e) {
    next(e);
  }
};
const update_service = async (req, res, next) => {
  const { name, des, weights, hairs } = req.body;
  const id = req.params.id;
  const fileName = req.file?.filename;
  let record;
  if (fileName) {
    record = {
      name: name,
      img: path.join(fileName),
      des: des,
      weights: JSON.parse(weights),
    };
  } else {
    record = {
      name: name,
      des: des,
      weights: JSON.parse(weights),
    };
  }
  try {
    const service = await serviceService.update_service(id, record);
    res.status(HttpStatus.OK).json({
      message: "register successfully",
      data: "",
    });
  } catch (e) {
    next(e);
  }
};

const get_all_service = async (req, res, next) => {
  try {
    const services = await serviceService.get_all_service();
    res.status(HttpStatus.OK).json({
      message: "get successfully",
      data: services,
    });
  } catch (e) {
    next(e);
  }
};

const find_service_by_id = async (req, res, next) => {
  const id = req.params.id;
  try {
    const service = await serviceService.find_service_by_id(id);
    res.status(HttpStatus.OK).json({
      message: "successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};
const delete_service = async (req, res, next) => {
  const id = req.params.id;
  try {
    const service = await serviceService.delete_service(id);
    res.status(HttpStatus.OK).json({
      message: "successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  add_service,
  update_service,
  get_all_service,
  find_service_by_id,
  delete_service,
};
