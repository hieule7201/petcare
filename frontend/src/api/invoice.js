import instance from "./config";

const getAllInvoices = async () => {
  return await instance.get("/get-all-invoice");
};
const getInvoiceById = async (id) => {
  return await instance.get(`/get-invoice-by-id/${id}`);
};
const updateInvoice = async (id, record) => {
  return await instance.put(`/update-invoice/${id}`, record);
};
const addInvoice = async (record) => {
  return await instance.post("/add-invoice", record);
};

export { getAllInvoices, getInvoiceById, addInvoice, updateInvoice };
