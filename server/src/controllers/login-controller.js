import { HttpStatusError } from "common-errors";
import jwt from "jsonwebtoken";

import config from "../config.js";
import { getUserByName } from "../services/database/user-db-service.js";
import { checkHash } from "../utils/encrypt.js";

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await getUserByName(username);

    if (!user || !checkHash(password, user.password)) {
      throw new HttpStatusError(401, "Invalid email or password");
    }

    if (user) {
      if (checkHash(password, user.password)) {
        const userInfo = {
          userId: user._id,
          username: user.username,
          role: user.role,
        };

        const jwtConfig = { expiresIn: 60 * 60 };
        const token = jwt.sign(userInfo, config.app.secretKey, jwtConfig);
        return res.send({ token });
      }
    }
  } catch (error) {
    next(error);
  }
}
