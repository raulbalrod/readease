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

export async function deleteUser(id) {
  return User.findByIdAndDelete(id);
}
