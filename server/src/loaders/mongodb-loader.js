import mongoose from "mongoose";
import logger from "../utils/logger.js";

export default async function (config) {
  const { url } = config;

  try {
    await mongoose.connect(url);
    logger.info(`Connect to MongoDB at readease database 👌`);
  } catch (err) {
    logger.error(
      `Error conecting to MongoDB at readease database 👎.\n ${err}`
    );
  }
}
