import {
  addBookToList,
  getUserBookList,
  getUserIdByUsername,
  removeBookFromList,
  updateBookStatus,
} from "../services/database/mylist-db-service.js";

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

export async function updateBookStatusController(req, res) {
  const { userId, bookId } = req.params;
  const { newStatus } = req.body;

  try {
    const user = await updateBookStatus(userId, bookId, newStatus);
    if (!user) {
      return res.status(404).send({ message: "User or book not found" });
    }
    res.status(200).send({ message: "Book status updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating book status", error: error.message });
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
