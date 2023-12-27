import express from "express";
import { serviceController } from "../controller/index.js";
const router = express.Router();

router.post("/add_service", serviceController.add_service);

router.get("/get_all_service", serviceController.get_all_service);
router.get("/find_service_by_id/:id", serviceController.find_service_by_id);
export default router;
