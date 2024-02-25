import { Router } from "express";
import {
  createUsercontroller,
  getUserBookListController,
  myBookList,
  removeBookFromListController,
} from "../controllers/user-controller.js";
import { login } from "../controllers/login-controller.js";

const router = Router();

router.post("/", createUsercontroller);
router.post("/login", login);
router.post("/:username/books", myBookList);
router.post("/:username/books/remove", removeBookFromListController);
router.get("/:username/books", getUserBookListController);

export default router;
