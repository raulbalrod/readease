import mongoose from 'mongoose';
import logger from '../utils/logger.js';

export default async function(config) {
  const url = `mongodb://${config.host}:${config.port}/${config.dbName}`;

  try {
    await mongoose.connect(url);
    logger.info(`Connect to MongoDB at ${url} 👌`);
  } catch(err) {
    logger.error(`Error conecting to MongoDB at ${url} 👎.\n ${err}`);
  }
}
