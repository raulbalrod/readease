import { HttpStatusError } from "common-errors";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBookById,
} from "../services/database/book-db-service.js";

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
    const id = req.params.id;
    const book = await getBookById(id);
    if (!book) throw new HttpStatusError(404, "Book not found");

    let bookData;
    const decoded = req.decoded;

    if (decoded.role === "Basic") {
      bookData = {
        _id: book._id,
        title: book.title,
        subtitle: book.subtitle,
        description: book.description,
        categories: book.categories,
        rating: book.rating,
        status: book.status,
        image: book.image,
        authors: book.authors,
        editorial: book.editorial,
        pageCount: book.pageCount,
      };
    }

    if (decoded.role === "Premium" || decoded.role === "Admin") {
      bookData = book;
    }

    return res.send(bookData);
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
    if (!book) throw new HttpStatusError(404, "Book not Found");
    return res.status(200).send(book);
  } catch (error) {
    next(error);
  }
}
