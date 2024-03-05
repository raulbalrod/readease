import jwt from "jsonwebtoken";
import {
  createUser,
  createUserWithRole,
} from "../services/database/user-db-service.js";
import { encryptPassword } from "../utils/encrypt.js";
import config from "../config.js";

export async function createBasicUser(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const role = "Basic";

    const user = await createUserWithRole({ username, email, password, role });

    res.status(201).send({ user });
  } catch (error) {
    next(error);
  }
}

export async function createPremiumUser(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const role = "Premium";

    const user = await createUserWithRole({ username, email, password, role });

    res.status(201).send({ user });
  } catch (error) {
    next(error);
  }
}

export async function createUsercontroller(req, res, next) {
  try {
    const body = req.body;
    body.password = await encryptPassword(body.password);
    const user = await createUser(body);

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      config.app.secretKey
    );

    res.status(201).send({ user, token });
  } catch (error) {
    next(error);
  }
}
