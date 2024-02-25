import { Book, User } from "../../models/index.js";

export async function createUser(user) {
  const userDoc = new User(user);
  const createdUser = await userDoc.save();
  return createdUser;
}

export async function addBookToList(userId, bookId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { status: 404, message: "Usuario no encontrado" };
    }

    if (!user.bookList.includes(bookId)) {
      user.bookList.push(bookId);
      await user.save();
      return {
        status: 200,
        message: "Libro agregado correctamente a la lista del usuario",
      };
    } else {
      return {
        status: 400,
        message: "El libro ya está en la lista del usuario",
      };
    }
  } catch (error) {
    console.error("Error en el servicio al agregar el libro:", error);
    throw error;
  }
}

export async function removeBookFromList(userId, bookId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { status: 404, message: "Usuario no encontrado" };
    }

    const bookIndex = user.bookList.indexOf(bookId);
    if (bookIndex !== -1) {
      user.bookList.splice(bookIndex, 1);
      await user.save();
      return {
        status: 200,
        message: "Libro eliminado correctamente de la lista del usuario",
      };
    } else {
      return {
        status: 400,
        message: "El libro no está en la lista del usuario",
      };
    }
  } catch (error) {
    console.error("Error en el servicio al eliminar el libro:", error);
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
    console.error("Error al obtener el userId por username:", error);
    throw error;
  }
}

export async function getUserBookList(username) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const bookList = await Book.find({ _id: { $in: user.bookList } });
    return bookList;
  } catch (error) {
    console.error("Error al obtener la lista de libros del usuario:", error);
    throw error;
  }
}
