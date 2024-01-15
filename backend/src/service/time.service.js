import timeModel from "../model/attribute/time.model.js";
const addTime = async ({ value, total }) => {
  return await timeModel.create({ value, total });
};
const findTimeById = async (id) => {
  return await timeModel.findById(id);
};
const updateTime = async (id, { value, total }) => {
  return await timeModel.findByIdAndUpdate(id, { value, total });
};
const deleteTime = async (id) => {
  return await timeModel.findByIdAndDelete(id);
};
const findAllTime = async () => {
  return await timeModel.find();
};

export default { addTime, findTimeById, updateTime, deleteTime, findAllTime };
