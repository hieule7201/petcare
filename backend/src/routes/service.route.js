import express from "express";
import { serviceController } from "../controller/index.js";
const router = express.Router();
import { upload } from "../multer.js";

router.post(
  "/add_service",
  upload.single("file"),
  serviceController.add_service
);
router.put(
  "/update_service/:id",
  upload.single("file"),
  serviceController.update_service
);

router.get("/get_all_service", serviceController.get_all_service);
router.get("/find_service_by_id/:id", serviceController.find_service_by_id);
router.delete("/delete_service/:id", serviceController.delete_service);
export default router;
