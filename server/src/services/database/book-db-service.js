import Book from "../../models/Book.js";

export async function createBook(data) {
  const book = new Book(data);
  return book.save();
}

export async function getBookByTitle(title) {
  const book = await Book.findOne({ title: { $regex: new RegExp(title, 'i') } });
  return book;
}

export async function getBooks(filters) {
  const { sort, offset, limit, ...query } = filters;
  return Book.find(filters).sort(sort).skip(offset).limit(limit);
}

export async function deleteBook(id) {
  return Book.findByIdAndDelete(id);
}

export async function updateBookById(id, newData) {
  return await Book.findByIdAndUpdate(id, newData, { new: true });
}
