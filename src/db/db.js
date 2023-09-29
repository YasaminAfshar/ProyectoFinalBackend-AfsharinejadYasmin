
import mongoose from "mongoose";
import config from ".././config.js";
import { logger } from "../utils/logger.js";
const connectionString = config.MONGO_ATLAS_URL;

try {
  await mongoose.connect(connectionString);
  logger.info("Connected to MongoDB Atlas database!");
} catch (error) {
  logger.error(error);
}
