import jwt from "jsonwebtoken";
import {
  addBookToList,
  createUser,
  getUserBookList,
  getUserIdByUsername,
  removeBookFromList,
} from "../services/database/user-db-service.js";
import { encryptPassword } from "../utils/encrypt.js";
import config from "../config.js";

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

export async function myBookList(req, res, next) {
  try {
    const { username } = req.params;
    const { bookId } = req.body;

    const userId = await getUserIdByUsername(username);
    if (!userId) {
      return res.status(404).send({ message: "User not found" });
    }

    const result = await addBookToList(userId, bookId);
    return res.status(result.status).send({ message: result.message });
  } catch (error) {
    next(error);
  }
}

export async function removeBookFromListController(req, res, next) {
  try {
    const { username } = req.params;
    const { bookId } = req.body;

    const userId = await getUserIdByUsername(username);
    if (!userId) {
      return res.status(404).send({ message: "User not found" });
    }

    const result = await removeBookFromList(userId, bookId);
    return res.status(result.status).send({ message: result.message });
  } catch (error) {
    next(error);
  }
}

export async function getUserBookListController(req, res, next) {
  try {
    const { username } = req.params;
    const bookList = await getUserBookList(username);
    return res.status(200).json(bookList);
  } catch (error) {
    next(error);
  }
}
