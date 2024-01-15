import express from "express";
import { dateController } from "../controller/index.js";

const router = express.Router();
router.post("/add-date", dateController.addDate);
router.get("/get-all-date", dateController.getAllDate);

router.put("/update-date/:id", dateController.updateDate);
router.get("/find-date-by-id/:id", dateController.findDateById);
router.delete("/delete-date/:id", dateController.deleteDate);
router.get(
  "/find-date-by-service/:services",
  dateController.findDateByIdService
);

export default router;
