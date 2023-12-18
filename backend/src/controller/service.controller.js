import serviceService from "../service/service.service.js";
import HttpStatus from "http-status-codes";

const add_service = async (req, res, next) => {
  const { name, img, des } = req.body;
  try {
    const service = await serviceService.add_service({ name, img, des });
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
export default {
  add_service,
  get_all_service,
  find_service_by_id,
};
