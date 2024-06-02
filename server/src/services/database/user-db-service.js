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

export async function changeRole(id, newRole) {
  const allowedRoles = ["Basic", "Premium"];
  if (!allowedRoles.includes(newRole)) {
    throw new Error("You dont have permission to that");
  }

  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  if (user.role === newRole) {
    throw new Error("The new role is the same as the current one");
  }

  user.role = newRole;
  await user.save();
  return user;
}

export async function getUserByName(username) {
  const user = await User.findOne({ username }).select("-password");
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
