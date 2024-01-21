import serviceSchema from "../model/service.model.js";
import fs from "fs";

const get_all_service = async () => {
  return await serviceSchema.find();
};
const add_service = async ({ name, img, des, weights, hairs }) => {
  return await serviceSchema.create({
    name,
    img,
    des,
    weights,
    hairs,
  });
};
const update_service = async (id, record) => {
  const service = await serviceSchema.findById(id);
  if (record.img) {
    fs.unlinkSync(`./uploads/${service.img}`);
  }

  return await serviceSchema.findByIdAndUpdate(id, record);
};
const find_service_by_id = async (id) => {
  return await serviceSchema.findById(id);
};
const delete_service = async (id) => {
  const exist = await serviceSchema.findById(id);
  if (exist.img) {
    fs.unlinkSync(`./uploads/${exist.img}`);
  }
  return await serviceSchema.findByIdAndDelete(id);
};

export default {
  get_all_service,
  add_service,
  update_service,
  find_service_by_id,
  delete_service,
};
