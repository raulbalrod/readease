import { User } from "../../models/index.js";
import { encryptPassword } from "../../utils/encrypt.js";

export async function createUser(user) {
  const userDoc = new User(user);
  const createdUser = await userDoc.save();
  return createdUser;
}

export async function createUserWithRole(userData) {
  userData.password = await encryptPassword(userData.password);

  const user = await createUser(userData);

  return user;
}

export async function getUserByName(username) {
  const user = await User.findOne({ username });
  return user;
}

export async function getUsers(filters) {
  const { name } = filters;
  const query = {
    username: name ? new RegExp(name, "i") : undefined,
  };
  const cleanedQuery = Object.fromEntries(
    Object.entries(query).filter(([_, a]) => a !== undefined)
  );

  const users = await User.find(cleanedQuery).select({ password: 0 });

  return users;
}

export async function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

export async function editUser(id, username, email) {
  try {
    const user = await User.findById(id);

    if (!user) throw new HttpStatusError(404, "User not Found");

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
}
