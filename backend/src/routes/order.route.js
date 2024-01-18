import express from "express";
import { orderController } from "../controller/index.js";

const router = express.Router();

router
  .get("/get-all-orders", orderController.getAllOrders)
  .get("/get-order-by-id/:id", orderController.getOrderById)
  .get("/get-order-by-customer/:customer", orderController.getOrderByCustomer)
  .put("/edit-status/:id", orderController.editStatus)
  .put("/update-order/:id", orderController.updateOrder)
  .post("/add-order", orderController.addOder);

export default router;
