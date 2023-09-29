import { Router } from "express";
import {
  registerController,
  loginController,
  registerErrorController,
  loginErrorController
} from "../controllers/users.controllers.js";
const router = Router();

router.get("/register", registerController);
router.get("/login", loginController);
router.get("/register-error", registerErrorController);
router.get("/login-error", loginErrorController);

export default router;
