import { Router } from "express";
import {
  createBookController,
  deleteBookController,
  getAllBooks,
  getBook,
  updateBook,
  updateStatus,
} from "../controllers/book-controller.js";
import {
  checkRole,
  checkToken,
  isAdmin,
} from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/", checkToken, getAllBooks); // basic && premium [checkToken??]
router.get("/:title", checkRole, getBook); // basic || premium --- basic && premium
router.patch("/:title/status", checkToken, updateStatus); // basic && premium [checkToken??]
router.post("/", isAdmin, createBookController); // admin
router.patch("/:id", isAdmin, updateBook); // admin
router.delete("/:id", isAdmin, deleteBookController); // admin

export default router;
