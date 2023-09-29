
import { Router } from "express";
import { loggerTest } from "../utils/logger.js";

import { HttpResponse } from "../middlewares/errorHandlers/http.response.js";
const httpResponse = new HttpResponse();


const router = Router();

router.get("/", (req, res) =>{
    loggerTest();
    return httpResponse.Ok(res, "Prueba de loggers realizada con éxito!")
} );

export default router;
