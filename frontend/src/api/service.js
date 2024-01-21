import instance from "./config";
const config = { headers: { "Content-type": "multipart/form-data" } };
const add_service = async (service) => {
  return await instance.post("/add_service", service, config);
};
const update_service = async (id, service) => {
  return await instance.put(`/update_service/${id}`, service, config);
};

const get_all_service = async () => {
  return await instance.get("/get_all_service");
};

const find_service_by_id = async (id) => {
  return await instance.get(`/find_service_by_id/${id}`);
};
const delete_service = async (id) => {
  return await instance.delete(`/delete_service/${id}`);
};

export {
  add_service,
  find_service_by_id,
  get_all_service,
  update_service,
  delete_service,
};
