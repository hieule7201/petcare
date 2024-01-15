import httpStatus from "http-status-codes";
import timeService from "../service/time.service.js";

const addTime = async (req, res, next) => {
  const { value, total } = req.body;
  try {
    const data = await timeService.addTime({ value, total });
    res.status(httpStatus.CREATED).json({
      message: "Successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const updateTime = async (req, res, next) => {
  const { value, total } = req.body;
  const id = req.params.id;
  try {
    const data = await timeService.updateTime(id, { value, total });
    res.status(httpStatus.CREATED).json({
      message: "Successfully",
    });
  } catch (error) {
    next(error);
  }
};
const findAllTime = async (req, res, next) => {
  try {
    const data = await timeService.findAllTime();
    res.status(httpStatus.OK).json({
      message: "successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const findTimeById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const time = await timeService.findTimeById(id);
    res.status(httpStatus.OK).json({
      message: "successfully",
      data: time,
    });
  } catch (error) {
    next(error);
  }
};
const deleteTime = async (req, res, next) => {
  const id = req.params.id;
  try {
    const time = await timeService.deleteTime(id);
    res.status(httpStatus.OK).json({
      message: "successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default { addTime, findAllTime, findTimeById, updateTime, deleteTime };
