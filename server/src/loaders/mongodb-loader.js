import mongoose from "mongoose";
import logger from "../utils/logger.js";

export default async function (config) {
  const { clusterUrl } = config;

  try {
    await mongoose.connect(clusterUrl);
    logger.info(`Connect to MongoDB at ${clusterUrl} 👌`);
  } catch (err) {
    logger.error(`Error conecting to MongoDB at ${clusterUrl} 👎.\n ${err}`);
  }
}
