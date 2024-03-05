import jwt from "jsonwebtoken";
import {
  createUser,
  createUserWithRole,
  deleteUser,
} from "../services/database/user-db-service.js";
import { encryptPassword } from "../utils/encrypt.js";
import config from "../config.js";
import User from "../models/User.js";

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

export async function editUser(req, res, next) {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    res.status(200).send({ message: "Successfully updated user", user });
  } catch (error) {
    next(error);
  }
}

export async function deleteUserController(req, res, next) {
  try {
    const user = await deleteUser(req.params.id);
    if (!user) throw new HttpStatusError(404, "Book not Found");
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
}
