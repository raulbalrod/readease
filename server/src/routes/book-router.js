import { Router } from "express";
import {
  createBookController,
  deleteBookController,
  getAllBooks,
  getBook,
  updateBook,
  updateStatus,
} from "../controllers/book-controller.js";
import { checkRole, isAdmin } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/", getAllBooks); // basic && premium [checkToken??]
router.get("/:title", checkRole, getBook); // basic || premium --- basic && premium
router.patch("/:title/status", updateStatus); // basic || premium --- basic && premium
router.post("/", isAdmin, createBookController); // admin
router.patch("/:id", isAdmin, updateBook); // admin
router.delete("/:id", isAdmin, deleteBookController); // admin

export default router;
