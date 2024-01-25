import invoiceService from "../service/invoice.service.js";
import HttpStatus from "http-status-codes";

const getAllInvoices = async (req, res, next) => {
  try {
    const data = await invoiceService.getAllInvoices();
    res.status(HttpStatus.OK).json({
      message: "Successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const addInvoice = async (req, res, next) => {
  const {
    order,
    status,
    invoice_amount,
    discount,
    time_charge,
    amount_charge,
  } = req.body;
  try {
    const data = await invoiceService.addInvoice({
      order,
      status,
      invoice_amount,
    });
    res.status(HttpStatus.OK).json({
      message: "Successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const updateInvoice = async (req, res, next) => {
  const id = req.params.id;
  const { discount, amount_charge } = req.body;
  try {
    const data = await invoiceService.updateInvoice(id, {
      status: "Đã thanh toán",
      discount,
      time_charge: new Date(),
      amount_charge,
    });
    res.status(HttpStatus.OK).json({
      message: "Successfully",
    });
  } catch (error) {
    next(error);
  }
};
const getInvoiceById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await invoiceService.getInvoiceById(id);
    res.status(HttpStatus.OK).json({
      message: "Successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
export default { addInvoice, updateInvoice, getAllInvoices, getInvoiceById };
