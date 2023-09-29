import express from "express";
import { __dirname } from "./path.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import "./db/db.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./config/passport.config.js";
import "./config/passport.github.js";
import { errorHandler } from "./middlewares/errorHandlers/errorHandler.js";
import allRouters from "./routes/index.js";
import config from "./config.js";
import { logger } from "./utils/logger.js";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import {info} from "./docs/info.js";

import MessagesDaoMongo from "./persistence/daos/mongodb/messages.dao.js";
const messagesManager = new MessagesDaoMongo();

const app = express();
const PORT = config.PORT || 3000;

const specs = swaggerJSDoc(info);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

app.engine(
  "handlebars",
  handlebars.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(
  session({
    secret: "sessionKey",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: config.MONGO_ATLAS_URL,
      ttl: 60*60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", allRouters);
app.use(errorHandler);

const httpServer = app.listen(PORT, () => {
  logger.info("🚀 Server listening on port 8080");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  logger.info("¡🟢 New connection!", socket.id);

  socketServer.emit("messages", await messagesManager.getAllMessages());

  socket.on("disconnect", () => {
    logger.info("¡🔴 User disconnect!");
  });

  socket.on("newUser", (userName) => {
    logger.info(`${userName} is logged in`);
  });

  socket.on("chat:message", async ({ userName, message }) => {
    await messagesManager.createMessage(userName, message);
    socketServer.emit("messages", await messagesManager.getAllMessages());
  });

  socket.on("newUser", (userName) => {
    socket.broadcast.emit("newUser", userName);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
