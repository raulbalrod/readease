import { HttpStatusError } from "common-errors";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import config from "../config.js";

export function checkToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new HttpStatusError(401, "No token provided");
  }

  const [_bearer, token] = authorization.split(" ");

  try {
    const tokenInfo = jwt.verify(token, config.app.secretKey);
    req.user = tokenInfo;
    next();
  } catch (err) {
    logger.error(err.message);
    throw new HttpStatusError(401, "Invalid token");
  }
}
