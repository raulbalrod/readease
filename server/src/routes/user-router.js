import { Router } from "express";
import {
  createUsercontroller,
  getUserBookListController,
  myBookList,
  removeBookFromListController,
} from "../controllers/user-controller.js";
import { login } from "../controllers/login-controller.js";

const router = Router();

router.post("/", createUsercontroller); // all
router.post("/login", login); // all
router.post("/:username/books", myBookList); // basic && premium [checkToken??]
router.post("/:username/books/remove", removeBookFromListController); // basic && premium [checkToken??]
router.get("/:username/books", getUserBookListController); // basic && premium [checkToken??]

export default router;
