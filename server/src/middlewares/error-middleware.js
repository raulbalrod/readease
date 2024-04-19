import logger from "../utils/logger.js";

export function errorMiddleware(err, _req, res, _next) {
  logger.error(`${err.message} ${err.stack}`);

  const { status = 500, message } = err;
  let msg = message;

  if (status === 500) msg = `Server Error: ${message}`;

  const errorResponse = {
    status,
    message: msg,
  };

  res.status(status).send(errorResponse);
}
