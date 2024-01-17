import express from "express";
import { customerController } from "../controller/index.js";

const router = express.Router();

router.get("/get-all-cus", customerController.getAllCustomer);
router.get("/get-cus-by-id/:id", customerController.getCusById);
router.get("/get-cus-by-phone/:phone", customerController.getCusByPhone);
router.post("/add-cus", customerController.addCustomer);
router.get("/add-count/:phone", customerController.addCount);
router.put("/update-cus/:id", customerController.updateCustomer);

export default router;
