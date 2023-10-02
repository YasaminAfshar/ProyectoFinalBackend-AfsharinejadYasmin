
import mongoose from "mongoose";
import config from ".././config.js";
import { logger } from "../utils/logger.js";

const connectionString = config.MONGO_ATLAS_TEST;

export default async function dbTest() {
  try {
    mongoose.connect(connectionString);
    logger.info("Connected to MongoDB Atlas TEST database!");
  } catch (error) {
    logger.error(error);
  }
}