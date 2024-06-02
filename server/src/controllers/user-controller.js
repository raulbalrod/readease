import jwt from "jsonwebtoken";
import {
  changeRole,
  createUser,
  createUserWithRole,
  deleteUser,
  editUser,
  getUsers,
  getUserByName,
} from "../services/database/user-db-service.js";
import { encryptPassword } from "../utils/encrypt.js";
import config from "../config.js";

export async function getUserMe(req, res, next) {
  try {
    const user = await getUserByName(req.user.username);
    return res.send(user);
  } catch (error) {
    next(error);
  }
}

export async function createBasicUser(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const role = "Basic";

    const user = await createUserWithRole({ username, email, password, role });

    const userInfo = {
      userId: user._id,
      username: user.username,
      role: user.role,
    };

    const jwtConfig = { expiresIn: 60 * 60 };
    const token = jwt.sign(userInfo, config.app.secretKey, jwtConfig);

    res.status(201).send({ user, token });
  } catch (error) {
    next(error);
  }
}

export async function createPremiumUser(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const role = "Premium";

    const user = await createUserWithRole({ username, email, password, role });

    const userInfo = {
      userId: user._id,
      username: user.username,
      role: user.role,
    };

    const jwtConfig = { expiresIn: 60 * 60 };
    const token = jwt.sign(userInfo, config.app.secretKey, jwtConfig);

    res.status(201).send({ user, token });
  } catch (error) {
    next(error);
  }
}

export async function createUserController(req, res, next) {
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

export async function getUsersController(req, res, next) {
  try {
    const users = await getUsers(req.query);
    return res.send(users);
  } catch (error) {
    next(error);
  }
}

export async function changeRoleOfUser(req, res, next) {
  try {
    const { id } = req.params;
    const { newRole } = req.body;

    if (!newRole)
      return res.status(400).send({ message: "New role is required" });

    const updatedUser = await changeRole(id, newRole);
    res.send({ message: "Role updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
}

export async function editUserController(req, res, next) {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const updatedUser = await editUser(id, username, email);

    res
      .status(200)
      .send({ message: "Successfully updated user", user: updatedUser });
  } catch (error) {
    next(error);
  }
}

export async function deleteUserController(req, res, next) {
  try {
    const user = await deleteUser(req.params.id);
    if (!user) throw new HttpStatusError(404, "User not Found");
    return res
      .status(200)
      .send(`Successfully deleted ${user.username} whit id ${user.id}`);
  } catch (error) {
    next(error);
  }
}
