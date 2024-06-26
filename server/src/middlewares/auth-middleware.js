import { HttpStatusError } from "common-errors";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import config from "../config.js";

function verifyToken(req, _res, next) {
  const { authorization } = req.headers;

  if (!authorization) throw new HttpStatusError(401, "No token provided");

  const [_bearer, token] = authorization.split(" ");

  try {
    const tokenInfo = jwt.verify(token, config.app.secretKey);
    req.user = tokenInfo;
    return next();
  } catch (err) {
    logger.error(err.message);
    throw new HttpStatusError(401, "Invalid token");
  }
}

export function checkToken(req, res, next) {
  verifyToken(req, res, next);
}

export function checkTokenOwnUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.params.id !== req.user.userId) {
      return res
        .status(403)
        .send({ message: "You do not have permission to edit that" });
    }
    next();
  });
}

export function isAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role !== "Admin") {
      return res
        .status(403)
        .send({ message: "You are not authorized to access this resource" });
    }
    next();
  });
}

export function checkRole(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send({ message: "Missing token" });

  jwt.verify(token.split(" ")[1], config.app.secretKey, (err, decoded) => {
    if (err) res.status(401).send({ message: "Invalid token" });

    req.decoded = decoded;
    next();
  });
}
