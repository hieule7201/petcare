import express from "express";
import validation from "../middleware/validation.middleware.js";
import registerValidation from "../validation/register.validation.js";
import loginValidation from "../validation/login.validation.js";
import { userController } from "../controller/index.js";
import { Authenticated } from "../middleware/auth.js";
const router = express.Router();
router.post(
  "/register",
  validation(registerValidation),
  userController.register
);
router.post("/login", validation(loginValidation), userController.login);

router.get("/get_user", Authenticated, userController.get_user);
export default router;
