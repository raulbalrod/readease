import express from "express";
import bookRouter from "./book-router.js";
import userRouter from "./user-router.js";
import healthRouter from "./health-router.js";

const router = express.Router();
const versionAPI = "v1";

router.use(`/${versionAPI}/books`, bookRouter);
router.use(`/${versionAPI}/users`, userRouter);
router.use("/health", healthRouter);

export default router;
