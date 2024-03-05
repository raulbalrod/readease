import { Router } from "express";
import {
  createBasicUser,
  createPremiumUser,
  createUsercontroller,
  editUser,
} from "../controllers/user-controller.js";
import { login } from "../controllers/login-controller.js";
import {
  checkTokenToEditUserData,
  isAdmin,
} from "../middlewares/auth-middleware.js";
import {
  getUserBookListController,
  myBookList,
  removeBookFromListController,
} from "../controllers/mylist-controller.js";

const router = Router();

router.post("/", isAdmin, createUsercontroller); // admin
router.post("/basicUser", createBasicUser); // all
router.post("/premiumUser", createPremiumUser); // all
router.post("/login", login); // all
router.patch("/:id", checkTokenToEditUserData, editUser); // own user
router.delete("/:id", isAdmin, editUser); // admin

router.post("/:username/books", myBookList); // basic && premium [checkToken??]
router.get("/:username/books", getUserBookListController); // basic && premium [checkToken??]
router.post("/:username/books/remove", removeBookFromListController); // basic && premium [checkToken??]

export default router;
