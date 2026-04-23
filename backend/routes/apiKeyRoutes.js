const express = require("express");
const router = express.Router();

const { createKey } = require("../controllers/apiKeyController");
const authMiddleware = require("../middleware/authMiddleware");

// 🔹 protected route
router.post("/create", authMiddleware, createKey);

module.exports = router;