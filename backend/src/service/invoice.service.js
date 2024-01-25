import invoiceModel from "../model/invoice.model.js";

const addInvoice = async ({ order, status, invoice_amount }) => {
  return await invoiceModel.create({
    order,
    status,
    invoice_amount,
  });
};
const updateInvoice = async (
  id,
  { status, discount, time_charge, amount_charge }
) => {
  return await invoiceModel.findByIdAndUpdate(id, {
    status,
    discount,
    time_charge,
    amount_charge,
  });
};
const getAllInvoices = async () => {
  return await invoiceModel.find().populate({
    path: "order",
    populate: [
      {
        path: "customer",
        model: "customers",
        select: "name",
      },
      {
        path: "services",
        model: "services",
        select: "name",
      },
    ],
  });
};
const getInvoiceById = async (id) => {
  return await invoiceModel.findById(id).populate({
    path: "order",
    populate: [
      {
        path: "customer",
        model: "customers",
        select: "name",
      },
      {
        path: "services",
        model: "services",
        select: "name",
      },
    ],
  });
};

export default { addInvoice, updateInvoice, getAllInvoices, getInvoiceById };
