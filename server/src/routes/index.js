import express from "express";
import bookRouter from "./book-router.js";
import userRouter from "./user-router.js";

const router = express.Router();
const versionAPI = "v1";

router.use(`/${versionAPI}/books`, bookRouter);
router.use(`/${versionAPI}/users`, userRouter);

export default router;
