import {
  addBookToList,
  createUser,
  getUserBookList,
  getUserIdByUsername,
  removeBookFromList,
} from "../services/database/user-db-service.js";
import { encryptPassword } from "../utils/encrypt.js";

export async function createUsercontroller(req, res, next) {
  try {
    const body = req.body;
    body.password = await encryptPassword(body.password);
    const users = await createUser(req.body);
    return res.status(201).send(users);
  } catch (error) {
    if (error.code === 11000) error.status = 409;
    next(error);
  }
}

export async function myBookList(req, res, next) {
  try {
    const { username } = req.params;
    const { bookId } = req.body;

    const userId = await getUserIdByUsername(username);
    if (!userId) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const result = await addBookToList(userId, bookId);
    return res.status(result.status).send({ message: result.message });
  } catch (error) {
    console.error("Error en el controlador al agregar el libro:", error);
    return res.status(500).send({ message: "Error interno del servidor" });
  }
}

export async function removeBookFromListController(req, res, next) {
  try {
    const { username } = req.params;
    const { bookId } = req.body;

    const userId = await getUserIdByUsername(username);
    if (!userId) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const result = await removeBookFromList(userId, bookId);
    return res.status(result.status).send({ message: result.message });
  } catch (error) {
    console.error("Error en el controlador al eliminar el libro:", error);
    return res.status(500).send({ message: "Error interno del servidor" });
  }
}

export async function getUserBookListController(req, res) {
  try {
    const { username } = req.params;
    const bookList = await getUserBookList(username);
    return res.status(200).json(bookList);
  } catch (error) {
    console.error("Error al obtener la lista de libros del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
