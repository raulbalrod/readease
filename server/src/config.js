import 'dotenv/config';

const config = {
  port: process.env.PORT || 8080,
  app: {
    secretKey: process.env.SECRET_KEY,
  },
  database: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    dbName: process.env.MONGODB_DBNAME,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
  },
}

export default config;
