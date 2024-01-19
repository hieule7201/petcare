import customerSchema from "../model/customer.model.js";

const getAllCustomer = async () => {
  return await customerSchema.find();
};
const getCusByPhone = async (phone) => {
  return await customerSchema.findOne({ phone: phone });
};
const addCount = async (phone) => {
  const data = await customerSchema.findOne({ phone: phone });
  if (data)
    return await customerSchema.findByIdAndUpdate(data._id, {
      count: data.count + 1,
    });
  return;
};
const minusCount = async (id) => {
  const data = await customerSchema.findById(id);
  if (data)
    return await customerSchema.findByIdAndUpdate(data._id, {
      count: data.count - 1,
    });
  return;
};
const updateCustomer = async (id, { phone, email, name, address }) => {
  return await customerSchema.findByIdAndUpdate(id, {
    phone,
    email,
    name,
    address,
  });
};
const getCusById = async (id) => {
  return await customerSchema.findById(id);
};
const addCustomer = async ({ phone, email, name, address }) => {
  return await customerSchema.create({ phone, email, name, address });
};

export default {
  addCount,
  getAllCustomer,
  getCusByPhone,
  updateCustomer,
  getCusById,
  addCustomer,
  minusCount,
};
