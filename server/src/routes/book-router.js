import { Router } from "express";
import {
  createBookController,
  deleteBookController,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/book-controller.js";
import { isAdmin } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/", getAllBooks);
router.get("/:title", getBook);
router.post("/", isAdmin, createBookController); // admin
router.patch("/:id", isAdmin, updateBook); // admin
router.delete("/:id", isAdmin, deleteBookController); // admin

export default router;
