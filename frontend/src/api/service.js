import instance from "./config";

const add_service = async (service) => {
  return await instance.post("/add_service", service);
};

const get_all_service = async () => {
  return await instance.get("/get_all_service");
};
const find_service_by_id = async (id) => {
  return await instance.get(`/find_service_by_id/${id}`);
};
export { add_service, find_service_by_id, get_all_service };
