import { Router } from "express";
import { logger } from "../utils/logger.js";
import ProductsDaoMongo from ".././persistence/daos/mongodb/products.dao.js";

const router = Router();
const productManager = new ProductsDaoMongo();

router.get("/", async (req, res) => {
  try {
    let products = await productManager.getProducts();
    const user = req.user;
    res.render("products", { products, user });
  } catch (error) {
    logger.error(error);
  }
});

export default router;