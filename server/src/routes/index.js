import express from "express";
import bookRouter from "./book-router.js";
import userRouter from "./user-router.js";
import { checkToken } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.use("/books", checkToken, bookRouter);
router.use("/users", userRouter);

export default router;
