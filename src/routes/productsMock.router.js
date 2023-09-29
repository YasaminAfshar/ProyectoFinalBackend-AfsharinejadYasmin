
import { Router } from "express";
import { getAllProductsMockController, createProductMockController } from "../controllers/mockProducts.controller.js";

const router = Router();

router.get("/", getAllProductsMockController);
router.post("/", createProductMockController);

export default router;
