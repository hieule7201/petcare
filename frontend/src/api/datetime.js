import instance from "./config";

const addTime = async (time) => {
  return await instance.post("/add-time", time);
};
const getAllDate = async () => {
  return await instance.get("/get-all-date");
};
const updateTime = async (id, time) => {
  return await instance.put(`/update-time/${id}`, time);
};
const deleteTime = async (id) => {
  return await instance.delete(`/delete-time/${id}`);
};
const findTimeById = async (id) => {
  return await instance.get(`/find-time-by-id/${id}`);
};
const findAllTime = async () => {
  return await instance.get("/find-all-time");
};

const addDate = async (date) => {
  return await instance.post("/add-date", date);
};
const updateDate = async (id, date) => {
  return await instance.put(`/update-date/${id}`, date);
};
const deleteDate = async (id) => {
  return await instance.delete(`/delete-date/${id}`);
};
const findDateById = async (id) => {
  return await instance.get(`/find-date-by-id/${id}`);
};
const findDateByService = async (idService) => {
  return await instance.get(`/find-date-by-service/${idService}`);
};

export {
  addDate,
  addTime,
  updateDate,
  updateTime,
  deleteDate,
  deleteTime,
  findAllTime,
  findDateById,
  findDateByService,
  findTimeById,
  getAllDate,
};
