
import {createLogger, format, transports} from "winston";
import config from ".././config.js";

const { combine, printf, timestamp, colorize } = format;

const ENV = config.ENV;

const logConfigDev = {
    level: "silly",
    format: combine(
        timestamp({
        format: "MM-DD-YYYY HH:mm:ss",
        }),
        colorize(),
        printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message} | "Desarrollo (DEV)"`)
    ),
    transports: [
        new transports.Console({ level: "debug" }),
    ],
};

const logConfigProd = {
  level: "silly",
  format: combine(
    timestamp({
      format: "MM-DD-YYYY HH:mm:ss",
    }),
    colorize(),
    printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message} | "Producción (PROD)"`)
  ),
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({ filename: "./logs/prod-errors.log", level: "error" }),
  ],
};


export const logger = createLogger(ENV === "dev" ? logConfigDev : logConfigProd);

export const loggerTest = () => {
    logger.silly("Mensaje de prueba del nivel Silly");
    logger.debug("Mensaje de prueba del nivel Debug");
    logger.http("Mensaje de prueba del nivel Http");
    logger.info("Mensaje de prueba del nivel Info");
    logger.warn("Mensaje de prueba del nivel Warn");
    logger.error("Mensaje de prueba del nivel Error");
};