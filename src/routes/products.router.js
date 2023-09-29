import { Router } from "express";
import {
  getProductController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/products.controllers.js";
import { authorizedAdmin, authorizedPremium } from "../middlewares/userValidators/userAuthentication.js";

const router = Router();


router.get("/", getProductController);
router.get("/:id", getProductByIdController);
router.post("/", authorizedPremium, addProductController);
router.put("/:id", authorizedAdmin, updateProductController);
router.delete("/:id", authorizedPremium, deleteProductController);

export default router;
