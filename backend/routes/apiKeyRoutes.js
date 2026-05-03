const express = require("express");
const router = express.Router();

const {
  createKey,
  revokeKey,
  getKeys,
} = require("../controllers/apiKeyController");

const authMiddleware = require("../middleware/authMiddleware");

// 🔹 GET ALL KEYS
router.get("/", authMiddleware, getKeys);

// 🔹 CREATE KEY
router.post("/create", authMiddleware, createKey);

// 🔹 REVOKE KEY
router.delete("/:keyId", authMiddleware, revokeKey);

module.exports = router;