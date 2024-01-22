import express from "express";
import { invoiceController } from "../controller/index.js";

const router = express.Router();

router
  .get("/get-all-invoice", invoiceController.getAllInvoices)
  .get("/get-invoice-by-id/:id", invoiceController.getInvoiceById)
  .put("/update-invoice/:id", invoiceController.updateInvoice)
  .post("/add-invoice", invoiceController.addInvoice);

export default router;
