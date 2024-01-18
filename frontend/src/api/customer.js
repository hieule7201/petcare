import instance from "./config";

const getAllCus = async () => {
  return await instance.get("/get-all-cus");
};

const getCusById = async (id) => {
  return await instance.get(`/get-cus-by-id/${id}`);
};
const getCusByPhone = async (phone) => {
  return await instance.get(`/get-cus-by-phone/${phone}`);
};
const addCount = async (phone) => {
  return await instance.get(`/add-count/${phone}`);
};
const updateCus = async (id, { phone, email, name, address }) => {
  return await instance.put(`/update-cus/${id}`, {
    phone,
    email,
    name,
    address,
  });
};
const addCus = async ({ phone, email, name, address }) => {
  return await instance.post("/add-cus", { phone, email, name, address });
};

export { getAllCus, getCusById, getCusByPhone, addCount, addCus, updateCus };
