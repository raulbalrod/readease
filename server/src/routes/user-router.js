import { Router } from "express";
import {
  changeRoleOfUser,
  createBasicUser,
  createPremiumUser,
  createUserController,
  deleteUserController,
  editUserController,
  getUsersController,
} from "../controllers/user-controller.js";
import { login } from "../controllers/login-controller.js";
import {
  checkToken,
  checkTokenOwnUser,
  isAdmin,
} from "../middlewares/auth-middleware.js";
import {
  getUserBookListController,
  myBookList,
  removeBookFromListController,
  updateBookStatusController,
} from "../controllers/mylist-controller.js";

const router = Router();

router.post("/login", login); // all
router.post("/", isAdmin, createUserController); // admin
router.post("/basicUser", createBasicUser); // all
router.post("/premiumUser", createPremiumUser); // all
router.patch("/:id/role", checkTokenOwnUser, changeRoleOfUser); // own user
router.get("/", isAdmin, getUsersController); // admin
router.patch("/:id", checkTokenOwnUser, editUserController); // own user
router.delete("/:id", isAdmin, deleteUserController); // admin

router.post("/:username/books", checkToken, myBookList); // basic && premium [checkToken??]
router.patch("/:userId/book/:bookId", updateBookStatusController); // own user
router.get("/:username/books", checkToken, getUserBookListController); // basic && premium [checkToken??]
router.post(
  "/:username/books/remove",
  checkToken,
  removeBookFromListController
); // basic && premium [checkToken??]

export default router;
