import { Book, User } from "../../models/index.js";

export async function addBookToList(userId, bookId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    if (!user.bookList.includes(bookId)) {
      user.bookList.push(bookId);
      await user.save();
      return {
        status: 200,
        message: "The book has been successfully added to the user's list",
      };
    } else {
      return {
        status: 400,
        message: "The book is already in the user's list",
      };
    }
  } catch (error) {
    console.error("Error in the service while adding the book:", error);
    throw error;
  }
}

export async function removeBookFromList(userId, bookId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const bookIndex = user.bookList.indexOf(bookId);
    if (bookIndex !== -1) {
      user.bookList.splice(bookIndex, 1);
      await user.save();
      return {
        status: 200,
        message: "Book successfully removed from the user's list",
      };
    } else {
      return {
        status: 400,
        message: "The book is not in the user's list",
      };
    }
  } catch (error) {
    console.error("Error in the service while removing the book:", error);
    throw error;
  }
}

export async function getUserIdByUsername(username) {
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return user._id;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving the userId for the username:", error);
    throw error;
  }
}

export async function getUserBookList(username) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    const bookList = await Book.find({ _id: { $in: user.bookList } });
    return bookList;
  } catch (error) {
    console.error("Error retrieving the user's book list:", error);
    throw error;
  }
}
