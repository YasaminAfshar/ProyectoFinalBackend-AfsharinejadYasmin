import { Router } from "express";
import { isLogged } from "../middlewares/userValidators/isLogged.js";

import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import messagesRouter from "./messages.router.js";
import productsView from "./productsView.router.js";
import viewsRouter from "./views.router.js";
import usersRouter from "./users.router.js";
import mockProductsRouter from "./productsMock.router.js";
import loggerTestRouter from "./logger.router.js"

const router = Router();

/* --------------------- SON LAS TRES RUTAS PRINCIPALES --------------------- */
router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);
router.use("/api/users", usersRouter);

/* ----------- ES LA RUTA DEL CHAT CREADO PARA UNO DE LOS DESAFIOS ---------- */
router.use("/messages", messagesRouter);

/* ----------- SON LAS RUTAS DE LAS VISTAS DE PRODUCTOS Y USUARIO HECHOS PARA UNO DE LOS DESAFIOS ----------- */
router.use("/products", isLogged, productsView);
router.use("/views", viewsRouter);

/* -------------------- ES LA RUTA DEL MOCK DE PRODUCTOS Y TESTEO DE LOGGER-------------------- */
router.use("/mockingproducts", mockProductsRouter);
router.use("/loggerTest", loggerTestRouter);

export default router;