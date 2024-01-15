import httpStatus from "http-status-codes";
import dateService from "../service/date.service.js";
import timeService from "../service/time.service.js";
import e from "express";

const addDate = async (req, res, next) => {
  const { idService, date, times } = req.body;
  const [day, month, year] = date.split("/");

  try {
    const data = await dateService.addDate({
      idService,
      date: new Date(year, month - 1, day),
      times,
    });
    res.status(httpStatus.CREATED).json({
      message: "Successfully",
      data: data,
    });
    res.status(httpStatus.OK).json(null);
  } catch (error) {
    next(error);
  }
};
const updateDate = async (req, res, next) => {
  const { date, times } = req.body;
  const id = req.params.id;
  const [day, month, year] = date.split("/");

  try {
    const data = await dateService.updateDate(id, {
      date: new Date(year, month - 1, day),
      times,
    });
    res.status(httpStatus.CREATED).json({
      message: "Successfully",
    });
    res.status(httpStatus.OK).json(null);
  } catch (error) {
    next(error);
  }
};
const findDateById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await dateService.findDateById(id);
    res.status(httpStatus.OK).json({
      message: "Successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const deleteDate = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await dateService.deleteDate(id);
    res.status(httpStatus.OK).json({
      message: "Successfully",
    });
  } catch (error) {
    next(error);
  }
};
const findDateByIdService = async (req, res, next) => {
  const services = req.params.services;
  try {
    const data = await dateService.findByIdService(services);
    res.status(httpStatus.OK).json({
      message: "Successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const getAllDate = async (req, res, next) => {
  try {
    const data = await dateService.getAllDate();
    res.status(httpStatus.OK).json({
      message: "Successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addDate,
  findDateById,
  findDateByIdService,
  updateDate,
  deleteDate,
  getAllDate,
};
