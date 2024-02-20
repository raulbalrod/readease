import Book from "../../models/Book.js";

export async function createBook(data) {
  return Book.create(data);
}

export async function getBookByTitle(title) {
  return Book.findOne({ title: { $regex: new RegExp(title, 'i') } });
}

export async function getBooks(filters) {
  const { categorie, status, sort } = filters;
  let query = {};

  if (categorie) {
    query.categories = categorie;
  }
  if (status) {
    query.status = status;
  }

  let sortOption = {};
  if (sort === 'az') {
    sortOption = { title: 1 };
  } else if (sort === 'za') {
    sortOption = { title: -1 };
  } else if (sort === 'pageCountAsc') {
    sortOption = { pageCount: 1 };
  } else if (sort === 'pageCountDesc') {
    sortOption = { pageCount: -1 };
  } else if (sort === 'rateDesc') {
    sortOption = { rating: -1 };
  } else if (sort === 'rateAsc') {
    sortOption = { rating: 1 };
  }

  return Book.find(query).sort(sortOption);
}

export async function deleteBook(id) {
  return Book.findByIdAndDelete(id);
}

export async function updateBookById(id, newData) {
  return Book.findByIdAndUpdate(id, newData, { new: true });
}
