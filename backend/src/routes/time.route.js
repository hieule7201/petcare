import express from "express";
import { timeController } from "../controller/index.js";

const router = express.Router();
router.post("/add-time", timeController.addTime);
router.put("/update-time/:id", timeController.updateTime);
router.get("/find-all-time", timeController.findAllTime);
router.get("/find-time-by-id/:id", timeController.findTimeById);
router.delete("/delete-time/:id", timeController.deleteTime);

export default router;
