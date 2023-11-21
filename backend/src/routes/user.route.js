import express from "express";

import validation from "../middleware/validation.middleware.js";
import registerValidation from "../validation/register.validation.js";
import loginValidation from "../validation/login.validation.js";

import { userController } from "../controller/index.js";
const router = express.Router();
router.post(
  "/register",
  validation(registerValidation),
  userController.register
);
router.post("/login", validation(loginValidation), userController.login);
export default router;
