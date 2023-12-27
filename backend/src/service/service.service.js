import serviceSchema from "../model/service.model.js";

const get_all_service = async () => {
  return await serviceSchema.find();
};
const add_service = async ({ name, img, des, times, weights, hairs }) => {
  return serviceSchema.create({
    name,
    img,
    des,
    times,
    weights,
    hairs,
  });
};
const find_service_by_id = async (id) => {
  return serviceSchema.findById(id);
};

export default {
  get_all_service,
  add_service,
  find_service_by_id,
};
