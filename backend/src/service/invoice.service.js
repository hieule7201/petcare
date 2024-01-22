import invoiceModel from "../model/invoice.model.js";

const addInvoice = async ({
  order,
  status,
  invoice_amount,
  discount,
  time_charge,
  amount_charge,
  change,
}) => {
  return await invoiceModel.create({
    order,
    status,
    invoice_amount,
    discount,
    time_charge,
    amount_charge,
    change,
  });
};
const updateInvoice = async (id, record) => {
  return await invoiceModel.findByIdAndUpdate(id, record);
};
const getAllInvoices = async () => {
  return await invoiceModel.find().populate("order");
};
const getInvoiceById = async (id) => {
  return await invoiceModel.findById(id).populate("order");
};

export default { addInvoice, updateInvoice, getAllInvoices, getInvoiceById };
