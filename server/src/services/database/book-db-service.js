import Book from "../../models/Book.js";
import { applyFilters } from "../../utils/filters.js";

export async function createBook(data) {
  return Book.create(data);
}

export async function getBookById(id) {
  return Book.findOne(id);
}

export async function getBooks(filters) {
  const query = applyFilters(filters);
  const { sortOption, ...filterQuery } = query;
  return Book.find(filterQuery).sort(sortOption);
}
export async function deleteBook(id) {
  return Book.findByIdAndDelete(id);
}

export async function updateBookById(id, newData) {
  return Book.findByIdAndUpdate(id, newData, { new: true });
}
