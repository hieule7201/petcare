import dateModel from "../model/attribute/date.model.js";
const addDate = async ({ services, date, times }) => {
  const exit = await dateModel.findOne({ date: date, services: services });
  if (exit) throw new Error("date exits");

  return await dateModel.create({ services, date, times });
};
const updateDate = async (id, { date, times }) => {
  const data = await dateModel.findById(id);
  const services = data.services;
  const dateDB = new Date(data.date).toLocaleDateString("vi-VN");
  console.log(dateDB !== new Date(date).toLocaleDateString("vi-VN"));
  if (dateDB !== new Date(date).toLocaleDateString("vi-VN")) {
    const exit = await dateModel.findOne({ date: date, services: services });
    if (exit) throw new Error("date exits");
  }
  return await dateModel.findByIdAndUpdate(id, { date, times });
};
const deleteDate = async (id) => {
  return await dateModel.findByIdAndDelete(id);
};
const findDateById = async (id) => {
  return await dateModel.findById(id);
};
const getAllDate = async () => {
  return await dateModel.find().populate("services");
};
const findByIdService = async (services) => {
  return await dateModel.find({ services: services }).populate("times");
};
export default {
  addDate,
  updateDate,
  findDateById,
  findByIdService,
  deleteDate,
  getAllDate,
};
