import express from "express";

const router = express.Router();

// Endpoint simple de health check
router.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;