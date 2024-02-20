import { HttpStatusError } from "common-errors";
import { createBook, deleteBook, getBookByTitle, getBooks, updateBookById } from "../services/database/book-db-service.js";

export async function getAllBooks(req, res, next) {
  try {
    const filters = req.query;
    const books = await getBooks(filters);
    return res.send(books);
  } catch (error) {
    next(error);
  }
}

export async function getBook(req, res, next) {
  try {
    const title = req.params.title;
    const book = await getBookByTitle(title);
    if (!book) throw new HttpStatusError(404, 'Book not found');
    return res.send(book);
  } catch (error) {
    next(error);
  }
}

export async function createBookController(req, res, next) {
  try {
    const body = req.body;
    const book = await createBook(body);
    return res.status(201).send(book);
  } catch (error) {
    next(error);
  }
}

export async function updateBook(req, res, next) {
  try {
    const updatedBook = await updateBookById(req.params.id, req.body);
    return res.send(updatedBook);
  } catch (error) {
    next(error);
  }
}

export async function deleteBookController(req, res, next) {
  try {
    const book = await deleteBook(req.params.id);
    if (!book) throw new HttpStatusError(404, 'Book not Found');
    return res.status(200).send(book);
  } catch (error) {
    next(error);
  }
}
